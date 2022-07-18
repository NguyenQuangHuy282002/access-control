import { EmployeeNS } from "./employee";
import { FilterData } from "../common/filter_data_handlers";
import { OrgNS } from "../org/org";
import { UserAuthNS } from "../auth/auth";
export class EmployeeBLLBase implements EmployeeNS.BLL {
  constructor(
    private dal: EmployeeNS.DAL,
    private orgBLL: OrgNS.BLL,
    private userAuthDAL: UserAuthNS.DAL
  ) {}

  async init() {}

  async ListEmployees(query: EmployeeNS.EmployeeQuery) {
    const employees = await this.dal.ListEmployees(query);
    return FilterData.Many<EmployeeNS.Employee>(employees);
  }

  async GetEmployee(id: string) {
    const employee = await this.dal.GetEmployee(id);
    let viewEmployee: EmployeeNS.ViewEmployee = {
      ...employee,
    };
    if (!employee || !FilterData.One<EmployeeNS.Employee>(employee)) {
      throw EmployeeNS.Errors.EmployeeNotFound;
    }
    if (employee.role === EmployeeNS.ROLE.ADMIN) {
      return viewEmployee;
    } else {
      const org = await this.orgBLL.GetOrg(employee.org_id);
      return {
        ...viewEmployee,
        org: org,
      };
    }
  }

  async GetEmployeeByUsername(username: string) {
    const employee = await this.dal.GetEmployeeByUsername(username);
    if (!employee || !FilterData.One<EmployeeNS.Employee>(employee)) {
      throw EmployeeNS.Errors.EmployeeNotFound;
    }
    if (employee.role === EmployeeNS.ROLE.ADMIN) {
      return employee;
    }
    const org = await this.orgBLL.GetOrg(employee.org_id);
    return {
      ...employee,
      org: org,
    };
  }

  async CreateEmployee(params: EmployeeNS.CreateEmployeeParams) {
    if (params.org_id) {
      await this.orgBLL.GetOrg(params.org_id);
    }
    const employee = {
      id: EmployeeNS.Generator.NewEmployeeID(),
      ...params,
      ctime: Date.now(),
      mtime: Date.now(),
    };
    await this.dal.CreateEmployee(employee);
    return employee;
  }

  async UpdateEmployee(id: string, params: EmployeeNS.UpdateEmployeeParams) {
    const employee = await this.GetEmployee(id);
    let doc: EmployeeNS.Employee= {} as any
    if(employee.org){
      const {org,...rest}=employee
      doc={
        ...rest,
        ...params,
        mtime: Date.now(),
      }
    }else{
      doc={
        ...employee,
        ...params,
        mtime: Date.now(),
      }
    }
    await this.dal.UpdateEmployee(doc)
    return doc
    // if (employee.org) {
    //   const { org, ...rest } = employee;
    //   const doc = {
    //     ...rest,
    //     ...params,
    //     mtime: Date.now(),
    //   };
    //   await this.dal.UpdateEmployee(doc);
    //   if (params.org_id) {
    //     const updateOrg = await this.orgBLL.GetOrg(params.org_id);
    //     return {
    //       ...doc,
    //       org: updateOrg,
    //     };
    //   }
    //   return {
    //     ...doc,
    //     org: org,
    //   };
    // }else{

    // }
  }

  async DeleteEmployee(id: string) {
    const employee = await this.GetEmployee(id);
    const doc = await this.UpdateEmployee(id, { dtime: Date.now() });
    const sessions = await this.userAuthDAL.GetSessionByUser(doc.id);
    for (let s of sessions) {
      s.status = "deactive";
      await this.userAuthDAL.DisableSession(s);
    }
    await this.userAuthDAL.DeleteSecret(employee.id);
    return doc;
  }
}
