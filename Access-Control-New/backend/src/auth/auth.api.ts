import * as express from 'express';
import { HttpError, HttpStatusCodes, HttpParamValidators } from '../lib/http';
import { UserAuthNS } from './auth';
import { NewAuthMiddleware, GetAuthData } from './auth.api.middleware';
import { EmployeeNS } from "../employee/employee";

export function NewAuthAPI(
    userAuthBLL: UserAuthNS.BLL,
) {
    const router = express.Router();
    router.post("/login", async (req, res) => {
        const { username, password } = req.body;
        try {
            const session = await userAuthBLL.Login(username, password);
            res.json(session);
        } catch (e) {
            switch (e) {
                case EmployeeNS.Errors.EmployeeNotFound:
                case UserAuthNS.Errors.ErrWrongPassword:
                case UserAuthNS.Errors.ErrUserHasNoLogin:
                    throw new HttpError(e.message, HttpStatusCodes.Unauthorized);
                default:
                    throw e;
            }
        }
    });

    router.post("/user/set_password", async (req, res) => {
        const username= HttpParamValidators.MustBeString(req.body,"username",6)
        const password = HttpParamValidators.MustBeString(req.body, 'password', 6);
        await userAuthBLL.SetPassword(username, password);
        res.json(1);
    });

    router.use(NewAuthMiddleware(userAuthBLL));
    router.get("/me", async (req, res) => {
        const session = GetAuthData(req);
        try {
            const doc=await userAuthBLL.GetUser(session.user_id);
            res.json(doc);
        } catch (e) {
            if(e===EmployeeNS.Errors.EmployeeNotFound){
                throw new HttpError(e.message,HttpStatusCodes.Unauthorized)
            }else{
                throw e
            }
        }
    });

    router.get("/me/set_password", async (req, res) => {
        const session = GetAuthData(req);
        const user=await userAuthBLL.GetUser(session.user_id)
        const password = HttpParamValidators.MustBeString(req.body, 'password', 6);
        await userAuthBLL.SetPassword(user.username, password);
        res.json(session);
    });
    
    return router;
}