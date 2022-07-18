import rand from "../lib/rand";

export namespace TodoNS {
    export interface Todo {
        id : string;
        name : string;
        ctime : number;
        mtime : number;
    }

    export interface CreateTodoParams {
        name : string;
    }

    export interface UpdateTodoParams {
        name? : string;
    }

    export interface BLL {
        GetTodo(id : string) : Promise<Todo>;
        ListTodo() : Promise<Todo[]>;
        CreateTodo(params : CreateTodoParams) : Promise<Todo>;
        UpdateTodo(id: string, params : UpdateTodoParams) : Promise<Todo>;
    }

    export interface DAL {
        GetTodo(id : string) : Promise<Todo>;
        ListTodo() : Promise<Todo[]>;
        CreateTodo(todo : Todo) : Promise<void>;
        UpdateTodo(todo : Todo) : Promise<void>;
    }

    export const Errors = {
        TodoNotFound : new Error("Todo Not Found"),
        TodoExist : new Error("Todo does existed")
    }

    export const Generator = {
        NewTodoID : () => rand.uppercase(8),
        // NewInternCode : () => 
    }
}