import rand from "../lib/rand";

export namespace CompanyNS {
  export interface Company {
    id: string;
    name: string;
    email: string;
    phone: string;
    website: string;
    birthday: string;
    ctime: number;
    mtime: number;
    dtime?: number;
  }

  export interface CreateCompanyParams {
    name: string;
    email: string;
    phone: string;
    website: string;
    birthday: string;
  }

  export interface UpdateCompanyParams {
    name?: string;
    email?: string;
    phone?: string;
    website?: string;
    birthday?: string;
  }

  export interface BLL {
    ListCompany(): Promise<Company[]>;
    GetCompany(id: string): Promise<Company>;
    CreateCompany(params: CreateCompanyParams): Promise<Company>;
    UpdateCompany(id: string, params: UpdateCompanyParams): Promise<Company>;
    DeleteCompany(id: string): Promise<Company>;
  }

  export interface DAL {
    ListCompany(): Promise<Company[]>;
    GetCompany(id: string): Promise<Company>;
    CreateCompany(company: Company): Promise<void>;
    UpdateCompany(company: Company): Promise<void>;
  }

  export const Errors = {
    CompanyNotFound: new Error("Company not found"),
    CompanyExist: new Error("Company already exists"),
  };

  export const Generator = {
    NewCompanyID: () => rand.uppercase(4),
  };
}
