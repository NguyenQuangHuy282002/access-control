import { CompanyNS } from "./company";
import { OrgNS } from "../org/org";
import { FilterData } from "../common/filter_data_handlers";
export class CompanyBLLBase implements CompanyNS.BLL {
  constructor(private dal: CompanyNS.DAL, private orgBLL: OrgNS.BLL) {}

  async init() {}

  async ListCompany() {
    const companies = await this.dal.ListCompany();
    return FilterData.Many<CompanyNS.Company>(companies);
  }

  async GetCompany(id: string) {
    const company = await this.dal.GetCompany(id);
    if (!company || !FilterData.One<CompanyNS.Company>(company)) {
      throw CompanyNS.Errors.CompanyNotFound;
    }
    return company;
  }

  async CreateCompany(params: CompanyNS.CreateCompanyParams) {
    const company = {
      id: CompanyNS.Generator.NewCompanyID(),
      ...params,
      ctime: Date.now(),
      mtime: Date.now(),
    };
    await this.dal.CreateCompany(company);
    return company;
  }

  async UpdateCompany(id: string, params: CompanyNS.UpdateCompanyParams) {
    const company = await this.GetCompany(id);
    const doc = {
      ...company,
      ...params,
      mtime: Date.now(),
    };

    await this.dal.UpdateCompany(doc);
    return doc;
  }

  async DeleteCompany(id: string) {
    const company = await this.GetCompany(id);
    const orgs = await this.orgBLL.ListOrg({ company_id: company.id });
    const doc = {
      ...company,
      dtime: Date.now(),
    };
    await this.dal.UpdateCompany(doc);
    for (let o of orgs) {
      await this.orgBLL.UpdateOrg(o.id, {
        status: OrgNS.OfficeStatus.DEACTIVE,
      });
    }
    return doc;
  }
}
