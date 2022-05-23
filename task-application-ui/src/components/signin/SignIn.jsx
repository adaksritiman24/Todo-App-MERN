import React, {useState} from 'react'
import axios from "axios";
import "./SignIn.css";
import URL from "../../utils/url";

export default function SignIn() {



  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);

  const handleSubmit = (e)=> {
    e.preventDefault();
    const name = e.target.username.value;
    const email = e.target.email.value;
    const password1 = e.target.password1.value;
    const password2 = e.target.password2.value;
    
    if(password1 !== password2){
      setError("The passwords donot match!");
      setSuccess(undefined)
      return
    }  
    const data = {
      name,
      email, 
      password : password1
    }
    setError(undefined);
    setSuccess(undefined);

    axios.post(URL+"/user/register",data)
    .then(response=> {
      
      if(response.data.status === "success"){
        setSuccess("Your account is created successfully!");
      }else {
        setError("Failed to create account!");
      }
    })
    .catch(error=>{
        setError("Failed to create account!");
    })
    
  }
  return (
    <div className='signup-page'>
        <section className='signup-section'>
          
           <form onSubmit={handleSubmit} className='signup-form'>
             <h2>Sign Up</h2>
            <input type="text" placeholder='Name' name='username'  required/>
            <input type="text" placeholder='Email' name='email' required/>
            <div>
              <div><b>Create a password</b></div>
              Password must be greater than 6 characters
            </div>
            <input type="password" placeholder='Password' name='password1' required/>
            <input type="password" placeholder='Retype Password'  name='password2' required/>
            <button type="submit">Submit</button>
           </form>
           <div className="invalid-signup">
             {error}
           </div>
           <div className="valid-signup">
             {success}
           </div>
        </section>
    </div>
  )
}
