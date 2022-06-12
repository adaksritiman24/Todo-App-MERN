const {Router} = require("express");
const userAuth = require("../utils/authenticator");
const TodoList = require("../models/todoList");
const mongoose = require("mongoose");

todo = Router();

todo.post("/todo", userAuth, async(req, res)=>{
    try {

        const todoListID = new mongoose.Types.ObjectId(req.body.listId);
    
        const todoList = await TodoList.findById(todoListID);
    
        todoList.items = [...todoList.items, {description : req.body.description, completed : req.body.completed}];
    
        await todoList.save();
        return res.send({
            create : "success"
        });
    }

    catch(error) {
        res.status(500).send({
            create : "failure"
        })
    }
})

todo.delete("/todo", userAuth, async(req, res)=> {

    try {
        const listId = new mongoose.Types.ObjectId(req.body.listId);
        const todoId = req.body.todoId;

        const todoList = await TodoList.findById(
            listId
        );

        const updatedTodos = todoList.items.filter((todo)=>String(todo._id) != todoId);
        
        todoList.items = updatedTodos;

        await todoList.save();

        res.send({
            delete : "success"
        })

    }
    catch(error) {
        res.status(500).send({
            delete : "failure"
        })
    }
})


todo.patch("/todo", userAuth, async(req, res)=>{
    try{

        const completed = req.body.completed;
        
        const todoId = req.body.todoId;
        const listId = new mongoose.Types.ObjectId(req.body.listId);

        const todoList = await TodoList.findById(
            listId
        );

        const updatedTodos = todoList.items.map((todo)=>{
            if(String(todo._id)===todoId)
                todo.completed = completed;
            
            return todo;
        })

        todoList.items = updatedTodos;
        await todoList.save();

        res.send({
            update : "success"
        })
        
    }
    catch(error) {
        res.status(500).send({
            update : "failure"
        })
    }
})

module.exports = todo;