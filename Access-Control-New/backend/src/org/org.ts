import rand from '../lib/rand';

export namespace OrgNS{
    export interface Org{
        id: string;
        code: string;
        company_id?: string;
        name: string;
        status:OfficeStatus;
        working_day:Array<number>;
        ctime:number;
        mtime:number;
    }

    export enum OfficeStatus{
        ACTIVE="active",
        DEACTIVE="deactive"
    }

    export interface CreateOrgParams{
        name: string;
        company_id: string;
        working_day:Array<number>;
        status:OfficeStatus;
    }

    export interface UpdateOrgParams{
        name?: string;
        status?:OfficeStatus;
        working_day?:Array<number>;
    }

    export interface OrgQuery{
        company_id?: string;
        status?: OfficeStatus;
    }
    export interface BLL{
        ListOrg(query: OrgQuery):Promise<Org[]>;
        GetOrg(id: string): Promise<Org>;
        CreateOrg(params:CreateOrgParams): Promise<Org>;
        UpdateOrg(id:string,params:UpdateOrgParams):Promise<Org>;
    }

    export interface DAL{
        ListOrg(query:OrgQuery):Promise<Org[]>;
        GetOrg(id: string):Promise<Org>;
        CreateOrg(org:Org):Promise<void>;
        UpdateOrg(org : Org): Promise<void>;
    }

    export const Errors = {
        OfficeNotFound: new Error("Org not found"),
        OfficeExist:new Error("Org already exist")
    }

    export const Generator={
        NewOrgID:()=>rand.uppercase(4),
        NewOrgCode:()=>rand.number(4)
    }
}