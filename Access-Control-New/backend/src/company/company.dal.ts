import {
  FromMongoData,
  ToMongoData,
  MongoModel,
  MongoDB,
  MongoErrorCodes,
} from "../lib/mongodb";
import { CompanyNS } from "./company";

export class CompanyMongoDAL implements CompanyNS.DAL {
  constructor(private db: MongoDB) {}

  private col_company =
    this.db.collection<MongoModel<CompanyNS.Company>>("company");

  async init() {}

  async ListCompany() {
    const companies = await this.col_company.find().toArray();
    return FromMongoData.Many<CompanyNS.Company>(companies);
  }

  async GetCompany(id: string) {
    const company = await this.col_company.findOne({ _id: id });
    return FromMongoData.One<CompanyNS.Company>(company);
  }

  async CreateCompany(company: CompanyNS.Company) {
    const doc = ToMongoData.One(company);
    try {
      await this.col_company.insertOne(doc);
    } catch (error) {
      if (error.code === MongoErrorCodes.Duplicate) {
        throw CompanyNS.Errors.CompanyExist;
      }
      throw error;
    }
  }

  async UpdateCompany(company: CompanyNS.Company) {
    const doc = ToMongoData.One(company);
    try {
      await this.col_company.updateOne({ _id: company.id }, { $set: doc });
    } catch (error) {
      throw error;
    }
  }
}
