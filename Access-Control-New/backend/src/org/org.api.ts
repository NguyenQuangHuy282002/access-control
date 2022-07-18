import * as express from "express";
import {OrgNS} from "./org";
import {HttpParamValidators} from "../lib/http"
export function NewOrgAPI(
    bll:OrgNS.BLL
){
    const router=express.Router();
    const status=Object.values(OrgNS.OfficeStatus);
    router.get("/org/list",async (req, res)=>{
        let query:OrgNS.OrgQuery={}
        if(req.query.company_id){
            query.company_id=HttpParamValidators.MustBeString(req.query,"company_id",4)
        }
        if(req.query.status){
            query.status=HttpParamValidators.MustBeOneOf(req.query,"status",status)
        }
        const orgs=await bll.ListOrg(query);
        res.json(orgs);
    })

    router.get("/org/get",async (req, res)=>{
        const id = HttpParamValidators.MustBeString(req.query, "id",4)
        const org=await bll.GetOrg(id)
        res.json(org)
    })

    router.post("/org/create",async (req, res)=>{
        const params:OrgNS.CreateOrgParams={
            name: HttpParamValidators.MustBeString(req.body, "name", 2),
            company_id: HttpParamValidators.MustBeString(req.body, "company_id",4),
            working_day: req.body.working_day,
            status:OrgNS.OfficeStatus.ACTIVE
        }
        const org=await bll.CreateOrg(params)
        res.json(org)
    })

    router.post("/org/update",async (req, res)=>{
        const id=HttpParamValidators.MustBeString(req.query, "id",4)
        const params:OrgNS.UpdateOrgParams={}
        if(req.body.name){
            params.name = HttpParamValidators.MustBeString(req.body, "name",2)
        }

        if(req.body.status){
            params.status = HttpParamValidators.MustBeOneOf(req.body, "status",status)
        }

        if(req.body.working_day){
            params.working_day = req.body.working_day
        }

        const org=await bll.UpdateOrg(id,params)
        res.json(org)
    })
    return router
}