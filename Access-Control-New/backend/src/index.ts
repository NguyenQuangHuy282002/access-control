import { ReadConfig } from "./config";
import * as express from "express";
import * as cors from "cors";
import "./lib/express";
import "./ext/log";
import { ExpressStaticFallback } from "./lib/express";
import { HttpErrorHandler } from "./common/http_errror_handler";
import { MongoCommon } from "./lib/mongodb";

import { TodoDALMongo } from "./todo/todo.dal";
import { TodoBLLBase } from "./todo/todo.bll";
import { NewTodoAPI } from "./todo/todo.api";

import { CompanyMongoDAL } from "./company/company.dal";
import { CompanyBLLBase } from "./company/company.bll";
import { NewCompanyAPI } from "./company/company.api";

import { OrgMongoDAL } from "./org/org.dal";
import { OrgBLLBase } from "./org/org.bll";
import { NewOrgAPI } from "./org/org.api";

import { EmployeeMongoDAL } from "./employee/employee.dal";
import { EmployeeBLLBase } from "./employee/employee.bll";
import { NewEmployeeAPI } from "./employee/employee.api";


import { NewAuthAPI } from "./auth/auth.api";
import {UserAuthBLLBase} from "./auth/auth.bll.base";
import {UserAuthDALMongo} from "./auth/auth.dal.mongo";

import { NewRegionAPI } from "./region/region.api";
import {NewRegionBLL} from "./region/region.bll";
import { RegionMongoDAL } from "./region/region.dal";

export async function main() {
  const config = await ReadConfig();
  console.log(config);
  const client = await MongoCommon.Connect(config.database.db_url);
  console.log("connected to database");
  const database = client.db(config.database.db_name);
  /********************************************************/
  const todoDAL = new TodoDALMongo(database);
  todoDAL.init();
  const todoBLL = new TodoBLLBase(todoDAL);
  todoBLL.init();

  /********************************************************/
  const regionDAL = new RegionMongoDAL(database);
  regionDAL.init();
  const regionBLL = new NewRegionBLL(regionDAL);
  regionBLL.init();

  /********************************************************/
  const companyDAL = new CompanyMongoDAL(database);
  companyDAL.init();

  const orgDAL = new OrgMongoDAL(database);
  orgDAL.init();
  const orgBLL = new OrgBLLBase(orgDAL, companyDAL);
  orgBLL.init();

  /********************************************************/

  const companyBLL = new CompanyBLLBase(companyDAL, orgBLL);
  companyBLL.init();

  /********************************************************/
  const authDAL = new UserAuthDALMongo(database);
  authDAL.init();
  
  const employeeDAL = new EmployeeMongoDAL(database);
  employeeDAL.init();
  const employeeBLL = new EmployeeBLLBase(employeeDAL, orgBLL,authDAL);
  employeeBLL.init();
  /********************************************************/
  
  const authBLL = new UserAuthBLLBase(authDAL,employeeBLL);
  authBLL.init();

  /********************************************************/
  const app = express();
  app.use(express.json());
  app.disable("x-powered-by");
  app.use(cors());
  /*******************************************************/
  app.use("/api/todo", NewTodoAPI(todoBLL));
  app.use("/api/company", NewCompanyAPI(companyBLL));
  app.use("/api/org", NewOrgAPI(orgBLL));
  app.use("/api/employee", NewEmployeeAPI(employeeBLL,authBLL));
  app.use("/api/auth", NewAuthAPI(authBLL));
  app.use("/api/region",NewRegionAPI(regionBLL))
  /*******************************************************/
  app.use("/", ExpressStaticFallback(config.app.dir));
  app.use(HttpErrorHandler);

  console.log(`listen on ${config.server.port}`);
  app.listen(config.server.port, "0.0.0.0", function () {
    const err = arguments[0];
    if (err) {
      console.log(err);
    }
  });
}
main().catch((err) => console.log(err));
