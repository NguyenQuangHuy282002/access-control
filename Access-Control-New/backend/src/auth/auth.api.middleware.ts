import { UserAuthNS } from './auth';
import { HttpError } from '../lib/http';
import { Request , Response} from 'express';
import { EmployeeNS } from '../employee/employee';

const AUTH_DATA_SYMBOL = Symbol('auth-data');
function setAuthData(ctx: any, data: any) {
    ctx[AUTH_DATA_SYMBOL] = data;
}

export function GetAuthData(ctx: any): UserAuthNS.UserSession {
    return ctx[AUTH_DATA_SYMBOL];
}

export function NewAuthMiddleware(userAuthBLL: UserAuthNS.BLL) {
    return async (req: Request, res: Response) => {
        const header = req.headers['authorization'];
        if (!header || !header.startsWith('Bearer ')) {
            throw new HttpError("missing access token", 401);
        }
        const session_id = header.substr('Bearer '.length);
        const session = await userAuthBLL.GetUserSession(session_id);
        if (!session ) {
            throw new HttpError("session not found", 401);
        } else if (session.status == "deactive"){
            throw new HttpError("session expired please login again", 401);
        } else {
            setAuthData(req, session);
        }
    };
}

const AUTH_ROLE_SYMBOL = Symbol('auth-role');

function SetAuthRole(ctx: any, data: any) {
    ctx[AUTH_ROLE_SYMBOL] = data;
}

export function GetAuthRole(ctx: any): EmployeeNS.Employee {
    return ctx[AUTH_ROLE_SYMBOL];
}

export function CheckRoleMiddleWare(employeeBLL: EmployeeNS.BLL, role: EmployeeNS.ROLE[]) {
    return async (req: Request, res: Response) => {
        const user_id = GetAuthData(req).user_id;
        const user = await employeeBLL.GetEmployee(user_id);
        if (role.includes(user.role)) {
            SetAuthRole(req, user);
        } else {
            throw new HttpError("Role not full allow", 404);
        }
    }
}
