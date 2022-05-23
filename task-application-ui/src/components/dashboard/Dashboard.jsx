import React from 'react'
import { Link} from "react-router-dom"
import { useContext, useState, useEffect } from 'react';
import Context from '../../contexts/context';
import axios from "axios";
import URL from "../../utils/url";
import TodoList from './todolist/TodoList';

import "./Dashboard.css"

export default function Dashboard() {

  const {state} = useContext(Context);
  const [todoLists, setTodoLists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  console.log(state);

  const headers = {
    Authorization : "Bearer " + state.token
  }

  const toggleModalOpen = ()=> {
    setIsModalOpen(!isModalOpen);
  }

  const fetchTodoLists = ()=> {


     
    axios.get(URL+"/todolist",{ headers } )
    .then((response)=>{
      console.log(response.data.todoLists);
      setTodoLists(response.data.todoLists);
    })  
    .catch(error=>{
      console.log(error);
      return null;
    });

  }

  const deleteTodoList = (_id)=> {
    const data = {_id}
    axios.delete(URL+"/todolist", {headers, data})
    .then(response=> {
      fetchTodoLists();
    })
    .catch(error=> {
      console.log(error);
    })
  }

  const showTodoLists = ()=> {
    if(todoLists) {
      return todoLists.map((todoList)=> 
        <TodoList
          deleteTodoList = {deleteTodoList}
          key={todoList._id}
          items_count = {todoList.items.length}
          _id={todoList._id}
          title={todoList.title}
          description={todoList.description}
        />
      )
      
    }
    return null;
  }

  const formSubmitHandler =(e)=> {
    e.preventDefault();
    const title = e.target.title.value.trim();
    const description = e.target.desc.value.trim();
    // console.log(title, description);

    const data = {
      title,
      description 
    }

    axios.post(URL+"/todolist",data, { headers } )
    .then((response)=>{
        fetchTodoLists();
        e.target.reset();
        toggleModalOpen();
    })  
    .catch(error=>{
      console.log(error);
    
    });

  }

  const renderForm = ()=> {
    return <div className='new-list-submit'>
            <form action="" onSubmit={formSubmitHandler}>
              <label className='todolist-form-label'>
                <div>Create new Todo List</div>
                <button onClick={toggleModalOpen} className="close-btn-todolist-modal">X</button>
              </label>
              <input type="text" name='title' placeholder='Title'  required/>
              <input type="text" name='desc'  placeholder='Description' required/>
              <button type="submit">Create</button>
            </form>
         </div>
  }

  const showDashBoard = ()=> {
    return <>
      <div className='dashboard'>
        <section>
          <h2> {state.name}</h2>
          <hr />
          <p>Dashboard</p>
        </section>
        <section>
          <div className='dashboard-items'>

            {isModalOpen ? renderForm(): <></>}


            <div className='your-todo-lists'>
              <div>Your Todo Lists</div> 
              <button onClick={toggleModalOpen}>Create new</button>

            </div>
            <div className='todo-lists'>
              {showTodoLists()}
            </div>

          </div>
        </section>
      </div>
    </>
  }

  const showLoggedOut=()=> {
    return <div>
      <p>Your are logged out</p>
      <Link to= "/login">Go back to login page</Link>
    </div>
  }

  useEffect(() => {
    fetchTodoLists();

  }, []);


  return (
    <>
    {state.token ? showDashBoard() : showLoggedOut()}
    </>
  )

}




