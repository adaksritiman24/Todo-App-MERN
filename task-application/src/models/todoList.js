const mongoose = require('mongoose');


const todoItem = mongoose.Schema({
    description : {
        type : String,
        required : true,
    },

    completed : {
        type : Boolean,
        default : false
    }
})

const todoListSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },

    title : {
        type : String,
        required : true,
        trim : true,
    },

    description : {
        type : String,
        required : true,
        trim : true,
    },

    items : {
        type : [todoItem]
    }
});

const TodoList = mongoose.model("TodoList", todoListSchema);

module.exports = TodoList;

