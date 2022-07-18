import * as express from "express";
import { HttpParamValidators } from "../lib/http";
import { CompanyNS } from "./company";
export function NewCompanyAPI(bll: CompanyNS.BLL) {
  const router = express.Router();

  router.get("/company/list", async (req, res) => {
    const companies = await bll.ListCompany();
    res.json(companies);
  });

  router.get("/company/get", async (req, res) => {
    const id = HttpParamValidators.MustBeString(req.query, "id", 4);
    const company = await bll.GetCompany(id);
    res.json(company);
  });

  router.post("/company/create", async (req, res) => {
    const params: CompanyNS.CreateCompanyParams = {
      name: HttpParamValidators.MustBeString(req.body, "name", 2),
      email: HttpParamValidators.MustBeEmail(req.body, "email"),
      phone: HttpParamValidators.CheckPhone(req.body, "phone", 10),
      website: HttpParamValidators.MustBeString(req.body, "website", 2),
      birthday: HttpParamValidators.MustBeString(req.body, "birthday", 10),
    };
    const company = await bll.CreateCompany(params);
    res.json(company);
  });

  router.post("/company/update", async (req, res) => {
    const id = HttpParamValidators.MustBeString(req.query, "id", 4);
    const params: CompanyNS.UpdateCompanyParams = {};
    if (req.body.name) {
      params.name = HttpParamValidators.MustBeString(req.body, "name", 2);
    }
    if (req.body.email) {
      params.email = HttpParamValidators.MustBeEmail(req.body, "email");
    }
    if (req.body.phone) {
      params.phone = HttpParamValidators.CheckPhone(req.body, "phone", 10);
    }
    if (req.body.website) {
      params.website = HttpParamValidators.MustBeString(
        req.body,
        "website",
        2
      );
    }
    if (req.body.birthday) {
      params.birthday = HttpParamValidators.MustBeString(
        req.body,
        "birthday",
        10
      );
    }
    const company = await bll.UpdateCompany(id, params);
    res.json(company);
  });

  router.post("/company/delete", async (req, res)=>{
    const id= HttpParamValidators.MustBeString(req.query, "id", 4);
    await bll.DeleteCompany(id)
    res.json(1);
  })
  return router;
}
