import rand from "../lib/rand";
import { EmployeeNS } from "../employee/employee";

export namespace UserAuthNS {
    export type User = EmployeeNS.Employee;
    export interface UserSecret {
        user_id: string;
        name: string;
        value: string;
        encode: string;
    }
    
    export interface UserSession {
        id: string;
        user_id: string;
        status : "active" | "deactive";
        ctime : number;
    }
    export interface SecretEncoder {
        name: string;
        encode(plain: string): Promise<string>;
        compare(plain: string, secret: string): Promise<boolean>;
    }
    
    export interface BLL {
        GetUser(id: string): Promise<User>;

        SetPassword(username: string, password: string): Promise<void>;
        Login(username: string, password: string): Promise<UserSession>;
        GetUserSession(id: string): Promise<UserSession>;
        DisableSession(user_id : string) : Promise<void>;
        DeleteSecret(user_id: string): Promise<void>;
    }
    
    
    export interface DAL {
        SaveUserSecret(value: UserSecret): Promise<void>;
        GetUserSecret(user_id: string, name: string): Promise<UserSecret>;
    
        CreateUserSession(session: UserSession): Promise<void>;
        GetUserSession(id: string): Promise<UserSession>;
        GetSessionByUser(user_id : string) : Promise<UserSession[]>;
        DisableSession(session : UserSession) : Promise<void>;
        DeleteSecret(user_id: string): Promise<void>;
    }
    
    export const Errors = {
        ErrUserHasNoLogin: new Error("user has no login"),
        ErrWrongPassword: new Error("wrong password"),
        ErrAllowAccess: new Error("user role not allow full access")
    }

    export const Generator = {
        NewUserSessionID : () => rand.alphabet(16)
    }
}