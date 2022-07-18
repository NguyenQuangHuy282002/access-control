import {OrgNS} from "./org";
import {FromMongoData,ToMongoData,MongoModel,MongoDB,MongoErrorCodes} from "../lib/mongodb";


export class OrgMongoDAL implements OrgNS.DAL{
    constructor( private db:MongoDB){}

    private col_org= this.db.collection<MongoModel<OrgNS.Org>>("org");
    
    async init(){}

    async ListOrg(query:OrgNS.OrgQuery){
        let filter={} as any 
        if(query.company_id){
            filter.company_id=query.company_id
        }
        if(query.status){
            filter.status=query.status
        }
        const orgs=await this.col_org.find(filter).toArray();
        return FromMongoData.Many<OrgNS.Org>(orgs)
    }

    async GetOrg(id: string) {
        const org=await this.col_org.findOne({ _id : id})
        return FromMongoData.One<OrgNS.Org>(org)
    }


    async CreateOrg(org:OrgNS.Org){
        const doc=ToMongoData.One(org)
        try {
            await this.col_org.insertOne(doc)
        } catch (error) {
            if(error.code === MongoErrorCodes.Duplicate){
                throw OrgNS.Errors.OfficeExist
            }
            throw error
        }
    }


    async UpdateOrg(org: OrgNS.Org) {
        const doc=ToMongoData.One(org)
        try {
            await this.col_org.updateOne({_id:org.id}, {$set: doc})
        } catch (error) {
            throw error
        }
    }
}