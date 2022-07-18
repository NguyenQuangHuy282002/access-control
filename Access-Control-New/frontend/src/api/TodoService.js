import { Http } from './http.js';

const API_ENDPOINT = {
  CREATE_TODO: '/todo/todo/create',
  LIST_TODO: '/todo/todo/list',
  GET_TODO: '/todo/todo/get',
  UPDATE_TODO: '/todo/todo/update',
  DELETE_TODO: '/todo/todo/delete',
};
class TodoService {
  constructor() {
    if (TodoService._instance) {
      return TodoService._instance;
    }
    TodoService._instance = this;
  }
  getList() {
    return Http.get(API_ENDPOINT.LIST_TODO);
  }
  get(id) {
    return Http.get(API_ENDPOINT.GET_TODO + `?id=${id}`);
  }
  create(payload) {
    return Http.post(API_ENDPOINT.CREATE_TODO, payload);
  }

  update(id, data) {
    return Http.post(API_ENDPOINT.UPDATE_TODO + `?id=${id}`, data);
  }

  delete(id) {
    return Http.post(API_ENDPOINT.DELETE_TODO + `?id=${id}`);
  }
}

const Service = new TodoService();

export default Service;
