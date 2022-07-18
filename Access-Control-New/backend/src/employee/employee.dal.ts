import {
  FromMongoData,
  ToMongoData,
  MongoModel,
  MongoDB,
  MongoErrorCodes,
} from "../lib/mongodb";
import { EmployeeNS } from "./employee";

export class EmployeeMongoDAL implements EmployeeNS.DAL {
  constructor(private db: MongoDB) {}
  private col_employee =
    this.db.collection<MongoModel<EmployeeNS.Employee>>("employee");
  async init() {
    this.col_employee.createIndex("username", {
      unique: true,
      background: true,
    });
  }

  async ListEmployees(query: EmployeeNS.EmployeeQuery) {
    let filter = {} as any;
    if (query.org_id) {
      filter.org_id = query.org_id;
    }
    const employees = await this.col_employee.find(filter).toArray();
    return FromMongoData.Many<EmployeeNS.Employee>(employees);
  }

  async GetEmployee(id: string) {
    const employee = await this.col_employee.findOne({ _id: id });
    return FromMongoData.One<EmployeeNS.Employee>(employee);
  }

  async  GetEmployeeByUsername(username: string){
    const employee = await this.col_employee.findOne({ username:username });
    return FromMongoData.One<EmployeeNS.Employee>(employee);
  }
  async CreateEmployee(employee: EmployeeNS.Employee) {
    const doc = ToMongoData.One<EmployeeNS.Employee>(employee);
    try {
      await this.col_employee.insertOne(doc);
    } catch (error) {
      if (error.code === MongoErrorCodes.Duplicate) {
        throw EmployeeNS.Errors.EmployeeExist;
      }
      throw error;
    }
  }

  async UpdateEmployee(employee: EmployeeNS.Employee) {
    const doc = ToMongoData.One<EmployeeNS.Employee>(employee);
    try {
      await this.col_employee.updateOne({ _id: employee.id }, { $set: doc });
    } catch (error) {
      throw error;
    }
  }
}
