import * as express from "express";
import { EmployeeNS } from "./employee";
import { HttpParamValidators,HttpError } from "../lib/http";
import {NewAuthMiddleware,CheckRoleMiddleWare,GetAuthRole} from "../auth/auth.api.middleware";
import {UserAuthNS} from "../auth/auth"
export function NewEmployeeAPI(
    bll: EmployeeNS.BLL,
    userAuthBLL:UserAuthNS.BLL
    ) {
  const router = express.Router();
  const role = Object.values(EmployeeNS.ROLE);
  const gender = Object.values(EmployeeNS.GENDER);
  router.get("/employee/list", async (req, res) => {
    let params: EmployeeNS.EmployeeQuery = {};
    if (req.query.org_id) {
      params.org_id = HttpParamValidators.MustBeString(req.query, "org_id", 4);
    }
    const employees = await bll.ListEmployees(params);
    res.json(employees);
  });

  router.get("/employee/get", async (req, res) => {
    const id = HttpParamValidators.MustBeString(req.query, "id", 4);
    const employee = await bll.GetEmployee(id);
    res.json(employee);
  });


  router.post("/employee/update", async (req, res) => {
    const id = HttpParamValidators.MustBeString(req.query, "id", 6);
    let params: EmployeeNS.UpdateEmployeeParams = {};
    Object.keys(req.body).forEach((key) => {
      if (
        [
          "username",
          "org_id",
          "full_name",
          "birthday",
          "cccd",
          "avatar",
          "address",
        ].includes(key)
      ) {
        params[key] = HttpParamValidators.MustBeString(req.body, key);
      }
      if (key === "role")
        params[key] = HttpParamValidators.MustBeOneOf(req.body, key, role);
      if (key === "gender")
        params[key] = HttpParamValidators.MustBeOneOf(req.body, key, gender);
      if (key === "phone")
        params[key] = HttpParamValidators.CheckPhone(req.body, key,10);
    });

    const employee = await bll.UpdateEmployee(id, params);
    res.json(employee);
  });


  router.use(NewAuthMiddleware(userAuthBLL))
  router.use(CheckRoleMiddleWare(bll,[EmployeeNS.ROLE.ADMIN,EmployeeNS.ROLE.SUPER_USER]))
  router.post("/employee/create", async (req, res) => {
    const user=GetAuthRole(req)
    if(user.role===EmployeeNS.ROLE.SUPER_USER && [EmployeeNS.ROLE.ADMIN,EmployeeNS.ROLE.SUPER_USER].includes(req.body.role)){
      throw new HttpError("Role not full allow", 404);
    }
    const params: EmployeeNS.CreateEmployeeParams = {
      username: HttpParamValidators.MustBeString(req.body, "username", 6),
      full_name: HttpParamValidators.MustBeString(req.body, "full_name", 2),
      birthday: HttpParamValidators.MustBeString(req.body, "birthday", 10),
      cccd: HttpParamValidators.MustBeString(req.body, "cccd", 8),
      role: HttpParamValidators.MustBeOneOf(req.body, "role", role),
      gender: HttpParamValidators.MustBeOneOf(req.body, "gender", gender),
      phone: HttpParamValidators.CheckPhone(req.body, "phone", 10),
      address: HttpParamValidators.MustBeString(req.body, "address", 2),
    };
    if(req.body.avatar){
      params.avatar= HttpParamValidators.MustBeString(req.body, "avatar", 2)
    }
    if(req.body.org_id){
      params.org_id = HttpParamValidators.MustBeString(req.body, "org_id",4)
    }
    const employee = await bll.CreateEmployee(params);
    res.json(employee);
  });

  router.post("/employee/delete", async (req, res) => {
    const id = HttpParamValidators.MustBeString(req.query, "id", 6);
    await bll.DeleteEmployee(id);
    res.json(1);
  });
  return router;
}
