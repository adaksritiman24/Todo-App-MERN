const jwt = require("jsonwebtoken");
const User = require("../models/user");
const mongoose = require("mongoose");

const userAuth = async (req, res, next)=> {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        const _id = new mongoose.Types.ObjectId(jwt.verify(token, "24#$OOPjwtmacro")["_id"]);

        const user = await User.findOne({
            _id, token
        });

        if(!user) throw new Error("Invalid user token");

        req.user = user;
        next();
    }
    catch(error) {
        res.status(403).send({
            error : "Not Authorized"
        })
    }
}

module.exports = userAuth;