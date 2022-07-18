import * as express from 'express';
import {HttpParamValidators} from '../lib/http';
import {RegionNS} from './region';

export function NewRegionAPI(
    bll: RegionNS.BLL
){
    const router = express.Router();
    const region_type = Object.values(RegionNS.RegionType);

    router.get('/region/list',async (req, res) => {
            const query: RegionNS.RegionQuery = {
                type: HttpParamValidators.MustBeOneOf(req.query,"type",region_type),
                parent_id: HttpParamValidators.MustBeString(req.query,"parent_id")
            }
            const regions = await bll.ListRegion(query);
            return res.json(regions)
    })

    router.get('/region/get',async(req, res)=>{
        const name = HttpParamValidators.MustBeString(req.query, "name")
            const region = await bll.GetRegion(name);
            return res.json(region)
    })
    
    return router
}