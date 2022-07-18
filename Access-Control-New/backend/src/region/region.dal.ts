import { FromMongoData, MongoDB ,MongoModel } from "../lib/mongodb";
import {RegionNS} from './region'
export class RegionMongoDAL implements RegionNS.DAL{
    constructor(private db: MongoDB){}

    private col_region= this.db.collection<MongoModel<RegionNS.Region>>("region")

    async init (){}

    async ListRegion(query:RegionNS.RegionQuery){
        let filter={} as any
        if(query.type){
            filter.type = query.type
        }
        if(query.parent_id){
            filter.parent_id = query.parent_id
        }
        const regions = await this.col_region.find(filter).toArray()
        return FromMongoData.Many<RegionNS.Region>(regions)
    }

    async GetRegion(name: string){
        const regions=await this.col_region.find({name:name}).toArray()
        return FromMongoData.Many<RegionNS.Region>(regions)
    }
}