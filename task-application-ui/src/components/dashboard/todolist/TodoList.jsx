import React from 'react'
import {useNavigate} from "react-router-dom"
import "./TodoList.css";

export default function TodoList(props) {

  const navigate = useNavigate();

  const todoItemsPage= ()=> {
    navigate('/todoitems/'+props._id);
  }

  return (
    <div  className="todolist">
        <div onClick={todoItemsPage}>
          <h4>{props.title}</h4>
          
          <p>
              <li>
              {props.description}
              </li>
          </p>
          
        </div>
        <div>
            {props.items_count}
          
        </div>
       
        <button className='delete-btn' onClick={()=>props.deleteTodoList(props._id)}>
          <i className="fa fa-solid fa-trash fa-2x"></i>
        </button>
      
    </div>
  )
}
