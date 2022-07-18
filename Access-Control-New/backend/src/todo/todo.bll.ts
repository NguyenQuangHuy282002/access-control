import { TodoNS } from "./todo";

export class TodoBLLBase implements TodoNS.BLL {
    constructor(
        private dal : TodoNS.DAL
    ) { }

    async init() { }

    async ListTodo() {
        const docs = await this.dal.ListTodo();
        return docs;
    }

    async GetTodo(id: string) {
        const doc = await this.dal.GetTodo(id);
        if (!doc) {
            throw TodoNS.Errors.TodoNotFound;
        }
        return doc;
    }

    async CreateTodo(params: TodoNS.CreateTodoParams) {
        const todo = {
            id : TodoNS.Generator.NewTodoID(),
            ...params,
            ctime : Date.now(),
            mtime : Date.now()
        }
        await this.dal.CreateTodo(todo);
        return todo;
    }

    async UpdateTodo(id: string, params: TodoNS.UpdateTodoParams) {
        const todo = await this.GetTodo(id);
        const doc = {...todo,...params };
        await this.dal.UpdateTodo(doc);
        return doc;
    }
}