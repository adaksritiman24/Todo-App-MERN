import React from "react";

const Context = React.createContext({
    state : {},
    dispatch : ()=>{
        console.log("IMPLEMENT THIS FUNCTION");
    }
})

export default Context;