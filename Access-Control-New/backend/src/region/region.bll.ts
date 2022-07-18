import {RegionNS} from './region'
export class NewRegionBLL implements RegionNS.BLL {
    constructor(private dal: RegionNS.DAL){}

    async init(){}

    async ListRegion(query:RegionNS.RegionQuery){
        const regions=await this.dal.ListRegion(query);
        return RegionNS.Ultis.SortAble(regions);
    }

    async GetRegion(name: string) {
        const region=await this.dal.GetRegion(name)
        if(!region){
            throw RegionNS.Errors.RegionNotFound
        }
        return region
    }

}
