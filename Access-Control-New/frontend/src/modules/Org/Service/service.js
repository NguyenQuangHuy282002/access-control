import { Http } from "../../../api/http";

const API_ENDPOINT = {
  LIST_ORG: "/org/org/list",
  CREATE_ORG: "/org/org/create",
  UPDATE_ORG: "/org/org/update",
  GET_ORG: "/org/org/get",
};

class OrgServices {
  constructor() {
    if (OrgServices._instance) {
      return OrgServices._instance;
    }
    OrgServices._instance = this;
  }
  getListOrg() {
    return Http.get(API_ENDPOINT.LIST_ORG);
  }
  getOrg(id) {
    return Http.get(API_ENDPOINT.GET_ORG + `?id=${id}`);
  }
  createOrg(data) {
    return Http.post(API_ENDPOINT.CREATE_ORG, data);
  }
  updateOrg(id, payload) {
    return Http.post(API_ENDPOINT.UPDATE_ORG + `?id=${id}`, payload);
  }
}

const OrgService = new OrgServices();

export default OrgService;
