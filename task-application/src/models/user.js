const mongoose = require('mongoose');


const userSchema = mongoose.Schema( {
    name : {
        type : String,
        trim : true,
        required : true,
    },

    email : {
        type : String,
        trim : true,
        required : true,
        unique : true,
        lowercase : true,
    },

    password : {
        type : String,
        trim : true,
        required : true,
        minLength : 6
    },

    token : String

} );

const User = mongoose.model("User",userSchema);

module.exports = User