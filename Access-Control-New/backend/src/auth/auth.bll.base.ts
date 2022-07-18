import { UserAuthNS } from "./auth";
import { AuthSecretPlainText, AuthSecretBcrypt } from "./auth.secret";
import {EmployeeNS} from "../employee/employee"

const secretEncoders: Map<string, UserAuthNS.SecretEncoder> = new Map([
    ['', new AuthSecretPlainText()],
    ['bcrypt', new AuthSecretBcrypt(8)]
]);

export class UserAuthBLLBase implements UserAuthNS.BLL {
    constructor(
        private dal: UserAuthNS.DAL,
        private employeeBLL: EmployeeNS.BLL
    ) { }
    async init() { }

    async GetUser(id: string) {
        return this.employeeBLL.GetEmployee(id);
    }


    async SetPassword(username:string, password: string) {
        let encoder = secretEncoders.get("");
        const user=await this.employeeBLL.GetEmployeeByUsername(username);
        const value = await encoder.encode(password);
        const secret: UserAuthNS.UserSecret = {
            user_id:user.id,
            name: "password",
            value,
            encode: encoder.name,
        }
        await this.dal.SaveUserSecret(secret);
    }

    async Login(username: string, password: string) {
        const user=await this.employeeBLL.GetEmployeeByUsername(username);
        // comapre password
        const secret = await this.dal.GetUserSecret(user.id, "password");
        if (!secret) {
            throw UserAuthNS.Errors.ErrUserHasNoLogin;
        }
        const encoder = secretEncoders.get(secret.encode);
        if (!encoder) {
            throw UserAuthNS.Errors.ErrWrongPassword;
        }
        const ok = await encoder.compare(password, secret.value);
        if (!ok) {
            throw UserAuthNS.Errors.ErrWrongPassword;
        }
        const session: UserAuthNS.UserSession = {
            id: UserAuthNS.Generator.NewUserSessionID(),
            user_id:user.id,
            status : "active",
            ctime : Date.now()
        };
        await this.dal.CreateUserSession(session);
        return session;
    }

    async GetUserSession(id: string) {
        return this.dal.GetUserSession(id);
    }

    async DisableSession(user_id: string) {
        const docs = await this.dal.GetSessionByUser(user_id);
        for (const d of docs) {
            d.status = "deactive";
            await this.dal.DisableSession(d);
        }
    }

    async DeleteSecret(user_id: string){
        await this.dal.DeleteSecret(user_id)
    }
}