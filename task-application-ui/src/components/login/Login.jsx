import React from 'react'
import {useNavigate} from "react-router-dom"
import { useContext, useState } from 'react'
import ActionTypes from '../../actions/actions';
import Context from '../../contexts/context'
import { useRef } from 'react';
import axios from "axios";
import URL from '../../utils/url';

import "./Login.css";

export default function Login(props) {

  const {dispatch} = useContext(Context);
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [invalidMessage, setInvalidMessage] = useState(null);

  const login= async(e)=>{
    e.preventDefault();

    const email = emailRef.current.value;
    const password =  passwordRef.current.value;

    axios.post(URL+"/user/login", {
      email : email , password : password
    }).then(response => {

      dispatch({
        type: ActionTypes.SET_AUTH_TOKEN,
        payload : response.data.token
      })
      dispatch({
        type: ActionTypes.SET_NAME,
        payload : response.data.name
      })
      localStorage.setItem("auth_name", response.data.name);
      localStorage.setItem("auth_token", response.data.token);
    
      navigate("/dashboard");

    }).catch(error => {
      setInvalidMessage("Invalid Credentials!");
    })
    

    // navigate("/dashboard");
  }

  return (
    <div className='loginpage'>
        <section>
          <h2>Login</h2>
          <div style={{maxWidth:"400px",margin:"auto"}}>

            <form onSubmit={login} class="input-icons">
                <i class="fa fa-user icon fa-2x username-icon"></i>
                <input type="text" class="input-field " ref={emailRef} required={true} placeholder="Email"/>
                <i class="fa fa-solid fa-key fa-2x icon password-icon"></i>
                <input type="password" class="input-field " ref={passwordRef} required={true} placeholder="Password"/>

                <div>
                  <button type='submit' className='login-submit'>Login</button>
                </div>
            </form>

          </div>
          <div className='invalid-message'>{invalidMessage}</div>
          <div className="not-registered">
            <span>Not Registered? <b onClick={()=>navigate("/signin")}>Sign Up</b></span>
          </div>
        </section>
      
    </div>
  )
}
