import { OrgNS } from "./org";
import {CompanyNS} from "../company/company";
import {FilterData} from "../common/filter_data_handlers"
export class OrgBLLBase implements OrgNS.BLL {
  constructor(private dal: OrgNS.DAL, private companyDAL: CompanyNS.DAL) {}

  async init() {}

  async ListOrg(query: OrgNS.OrgQuery) {
    const orgs = await this.dal.ListOrg(query);
    return orgs;
  }

  async GetOrg(id: string) {
    const org = await this.dal.GetOrg(id);
    if (!org) {
      throw OrgNS.Errors.OfficeNotFound;
    }
    return org;
  }

  async CreateOrg(params: OrgNS.CreateOrgParams) {
    const company=await this.companyDAL.GetCompany(params.company_id)
    if(!company){
      throw CompanyNS.Errors.CompanyNotFound
    }
    const org = {
      id: OrgNS.Generator.NewOrgID(),
      code: OrgNS.Generator.NewOrgCode(),
      ...params,
      ctime: Date.now(),
      mtime: Date.now(),
    };

    await this.dal.CreateOrg(org);
    return org;
  }

  async UpdateOrg(id: string, params: OrgNS.UpdateOrgParams) {
    const org = await this.GetOrg(id);
    const doc = {
      ...org,
      ...params,
      mtime: Date.now(),
    };

    await this.dal.UpdateOrg(doc);
    return doc;
  }
}
