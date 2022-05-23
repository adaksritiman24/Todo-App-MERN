const jwt =require("jsonwebtoken");

const generateAndSaveToken = async(user)=> {
    console.log(user.name);
    const token = jwt.sign({ _id : user._id},"24#$OOPjwtmacro");
    user.token = token;
    await user.save();
    return token;
}

module.exports = {
    generateAndSaveToken
}