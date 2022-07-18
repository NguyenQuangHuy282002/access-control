import * as express from "express";
import { HttpParamValidators } from "../lib/http";
import { TodoNS } from "./todo";

export function NewTodoAPI(
    todoBLL : TodoNS.BLL
) {
    const router = express.Router();

    router.get("/todo/list", async (req, res) => {
        const docs = await todoBLL.ListTodo();
        res.json(docs);
    })

    router.get("/todo/get", async (req,res) => {
        const id = HttpParamValidators.MustBeString(req.query, "id", 8);
        const doc = await todoBLL.GetTodo(id);
        res.json(doc);
    })

    router.post("/todo/create", async (req,res) => {
        const params : TodoNS.CreateTodoParams = {
            name : HttpParamValidators.MustBeString(req.body, "name", 2)
        }
        const doc = await todoBLL.CreateTodo(params);
        res.json(doc);
    })

    router.post("/todo/update", async (req,res) => {
        const id = HttpParamValidators.MustBeString(req.query, "id", 8);
        let params : TodoNS.UpdateTodoParams = {};
        if (req.body.name) {
            params.name = HttpParamValidators.MustBeString(req.body, "name", 2)
        }
        const doc = await todoBLL.UpdateTodo(id, params);
        res.json(doc);
    })
    
    return router;
}