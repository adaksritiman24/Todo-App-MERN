const {Router} = require("express");
const {generateAndSaveToken} = require("../utils/tokenGenerator");
const User = require('../models/user');
const userAuth = require("../utils/authenticator");

authorization = Router();

authorization.post('/user/register', async(req, res)=> {
    
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    console.log(name + email + password);
    try {
        await User({
            name,
            email,
            password
        }).save();

        return res.send({
            status : "success"
        });

    }catch(error) {
        return res.status(400).send({
            status : "failure",
        })
    }

})

authorization.post('/user/login', async(req, res)=> {

    try {
        const user = await User.findOne({email : req.body.email, password : req.body.password});

        if(user){
            //generate and save token
            const token = await generateAndSaveToken(user);

            return res.send({
                loginStatus : "success",
                name : user.name,
                token
            });
        }  
        else {
            return res.status(400).send({
                loginStatus : "failure"
            })
        }  
    }catch(error) {
        return res.status(500).send();
    }
})

authorization.get('/user/logout', userAuth, async (req, res)=> {
    
    req.user.token = "";
    await req.user.save();

    res.send({
        logout : "success"
    });
})

module.exports = authorization;


