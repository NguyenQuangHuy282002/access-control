import rand from "../lib/rand";
import { format } from "date-fns";
import { OrgNS } from "../org/org";
export namespace EmployeeNS {
  export interface Employee {
    id: string;
    username: string;
    org_id?: string;
    full_name: string;
    birthday: string;
    cccd: string;
    role: ROLE;
    avatar?: string;
    gender: GENDER;
    phone: string;
    address: string;
    ctime: number;
    mtime: number;
    dtime?: number;
  }

  export enum ROLE {
    ADMIN = "admin",
    EMPLOYEE = "employee",
    SUPER_USER = "superuser",
  }

  export enum GENDER {
    MEN = "men",
    WOMAN = "woman",
  }

  export interface CreateEmployeeParams {
    username: string;
    org_id?: string;
    full_name: string;
    birthday: string;
    cccd: string;
    role: ROLE;
    avatar?: string;
    gender: GENDER;
    phone: string;
    address: string;
  }

  export interface UpdateEmployeeParams {
    username?: string;
    org_id?: string;
    full_name?: string;
    birthday?: string;
    cccd?: string;
    role?: ROLE;
    avatar?: string;
    gender?: GENDER;
    phone?: string;
    address?: string;
    dtime?: number;
  }

  export interface ViewEmployee extends Employee {
    org?: OrgNS.Org;
  }
  export interface EmployeeQuery {
    org_id?: string;
  }


  export interface BLL {
    ListEmployees(query: EmployeeQuery): Promise<Employee[]>;
    GetEmployee(id: string): Promise<ViewEmployee>;
    GetEmployeeByUsername(username: string): Promise<ViewEmployee>;
    CreateEmployee(params: CreateEmployeeParams): Promise<Employee>;
    UpdateEmployee(
      id: string,
      params: UpdateEmployeeParams
    ): Promise<Employee>;
    DeleteEmployee(id: string): Promise<Employee>;
  }

  export interface DAL {
    ListEmployees(query: EmployeeQuery): Promise<Employee[]>;
    GetEmployee(id: string): Promise<Employee>;
    GetEmployeeByUsername(username: string): Promise<Employee>;
    CreateEmployee(employee: Employee): Promise<void>;
    UpdateEmployee(employee: Employee): Promise<void>;
  }

  export const Errors = {
    EmployeeNotFound: new Error("Employee not found"),
    EmployeeExist: new Error("Employee already exists"),
  };

  export const Generator = {
    NewEmployeeID: () => {
      return `NV${rand.number(4)}`
    },
    // NewEmployeeCode: (cccd: string) => {
    //   const now = format(Date.now(), "ddMMyyyy");
    //   return `${now}${cccd.substr(cccd.length - 4, 4)}`;
    // },
  };
}
