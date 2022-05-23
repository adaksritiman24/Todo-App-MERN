import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useContext } from 'react'
import Context from '../../contexts/context';
import ActionTypes from '../../actions/actions';


import "./Header.css";

export default function Header() {
    const { state, dispatch } = useContext(Context);
    const navigate = useNavigate();

    const logout = () => {
        
        dispatch({
            type: ActionTypes.SET_AUTH_TOKEN,
            payload: null
        })
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        navigate("/");

    }

    const LoggedInNavigations = () => {
        return <>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
                <a href='#' onClick={logout}>Logout</a>
            </li>
        </>
    }
    const notLoggedInNavigations = () => {
        return <>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/signin">Sign Up</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </>
    }

    return (
        <header>
            <h1>Todo Application</h1>
            <ul>
                {state.token ? LoggedInNavigations() : notLoggedInNavigations()}
            </ul>
        </header>
    )
}
