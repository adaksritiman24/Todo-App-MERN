import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
import SignIn from './components/signin/SignIn';
import Dashboard from './components/dashboard/Dashboard';

import reducer from './reducers/reducer';
import Context from './contexts/context';
import {useReducer} from "react"
import TodoItems from './components/todoItems/TodoItems';
import ErrorPage from './components/errorpage/ErrorPage';

function App() {

  const [state, dispatch] = useReducer(reducer, {
    token : localStorage.getItem("auth_token"),
    name : localStorage.getItem("auth_name")
  })


  return (
    <Context.Provider value={{state, dispatch}}>
      <main className="App">
        <BrowserRouter>
          <>
          <Header/>
          
          <Routes>
            <Route path='/' element={<Home/>}>

            </Route>
            <Route path='/login' element={<Login/>}>

            </Route>
            <Route path='/signin' element={<SignIn/>}>

            </Route>
            <Route path='/dashboard'  element={<Dashboard/>}>

            </Route>
            <Route path='/todoitems/:_id'  element={<TodoItems/>}>

            </Route>
            <Route path='*'  element={<ErrorPage/>}>

            </Route>
          </Routes>
          
          <Footer/>
          </>
        </BrowserRouter>

      </main>
    </Context.Provider>
  );
}

export default App;
