const express = require("express");
require("../connection/connection");
const authorization = require("./routes/authorization");
const main = require("./routes/main");
const todo = require("./routes/todo");
const cors = require("cors");


const PORT = process.env.PORT | 3000;


app = express();
app.use(cors(
    {
        origin: "http://localhost:3001"
    }
))
app.use(express.json());

app.use(authorization);
app.use(main);
app.use(todo);

app.listen(PORT, ()=> {
    console.log("Server running on port: "+ PORT);
});

