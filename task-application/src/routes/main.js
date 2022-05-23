const {Router} = require("express");
const userAuth = require("../utils/authenticator");
const TodoList = require("../models/todoList");
const mongoose = require("mongoose");
const async = require("hbs/lib/async");



main = Router();

main.post("/todolist", userAuth, async(req, res)=> {

    try {
        const todoList = new TodoList({
            user : req.user._id,
            title : req.body.title,
            description : req.body.description,
        });
        
        await todoList.save();

        res.send({
            create : "success",
            todoList : todoList 
        })

    }catch(error) {
        res.status(500).send({
            create : "failure",
            todoList : null
        })
    }
})

main.get("/todolist", userAuth, async(req, res)=> {

    try {
        const allTodoList = await TodoList.find({
            user : req.user._id
        });

        res.send({
            read : "success",
            todoLists  : allTodoList,
        });
    }
    catch { 
        res.send({
            read : "failure",
            todoLists  : null,
        });
    }
})

main.delete("/todolist", userAuth, async(req, res)=> {

    try {
        await TodoList.findByIdAndDelete(
            new mongoose.Types.ObjectId(req.body._id)
        )

        res.send({
            delete : "success"
        });
    }
    catch(error) {
        res.status(500).send({
            delete : "failure"
        });
    }
})

main.post("/todoitems", userAuth, async(req, res)=> {
 
    try {
        const listId = new mongoose.Types.ObjectId(req.body.listId);

        const todoList = await TodoList.findById(listId);

        res.send({
            read : "success",
            todoList : {
                title : todoList.title,
                description : todoList.description
            },
            todoitems  : todoList.items,
        });
    }    
    catch { 
        res.send({
            read : "failure",
            todoitems  : null,
        });
    }
})

module.exports = main;