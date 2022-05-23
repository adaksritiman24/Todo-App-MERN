import axios from 'axios';
import React ,  {useState, useEffect, useContext} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import URL from '../../utils/url';
import Context from '../../contexts/context';
import TodoItem from './TodoItem';

import "./TodoItems.css";

export default function TodoItems() {
    const params = useParams();
    const {state} = useContext(Context);
    const [items, setItems] = useState([]);
    const [listName, setListName] = useState("");
    const navigate = useNavigate();

    if(!state.token){
        console.log("State token is null");
        navigate("/login");
    }


    const headers = {
        Authorization : "Bearer " + state.token
    }

  const fetchTodoItems=()=> {
      const listId = params._id;
      const data = {
          listId
      }
      
      axios.post(URL+"/todoitems",data, {headers } )
      .then((response)=>{
          console.log('here', response.data);
          const fetchedItems = response.data.todoitems;
        setItems(
            fetchedItems.map((item)=> <TodoItem 
                item = {item}
                key = {item._id}
                deleteTodo = {deleteTodo}
            />
            )
        )
        setListName(response.data.todoList.title);
      })
      .catch(error=>{
          console.log("Error");
          console.log(error);
      })
  }

  const deleteTodo=(id)=> {
    const data = {
        listId : params._id,
        todoId : id
    }
    axios.delete(URL+"/todo",{headers, data} )
    .then(response=> {
        console.log(response);
        fetchTodoItems();
    })
    .catch(error=> {
        console.log(error);
    })

  }

  
  const handleSubmit = (e)=> {
      e.preventDefault();
      const desc = e.target.tododesc.value;
      const completed = e.target.completed.checked;
    console.log(desc, completed);

    const data = {
        listId : params._id,
        description : desc,
        completed
    }
    
    axios.post(URL+"/todo", data, {headers} )
    .then(response=> {
        console.log(response);
        fetchTodoItems();
        e.target.tododesc.value = "";
        e.target.completed.checked = false;
    })
    .catch(error=> {
        console.log(error);
    })
}

useEffect(() => {
    fetchTodoItems();
    
}, []);

return (
    <div className='items-page-bg'>
        <section>
          <h2>{state.name}</h2>
          <hr />
          <p>Dashboard <span style={{color:"red"}}>{" > "}</span> <span style={{color: "rgb(170, 250, 100)"}}>{listName}</span></p>
        </section>
        
        <section className='todo-container'>
            <form onSubmit={handleSubmit}>
                <p>Add item to this list</p>
                <textarea type="text" placeholder='Description of your todolist' name='tododesc'></textarea>
                <div>
                    <input type="checkbox" name="completed" /> <span>Check this box to mark as completed</span>
                </div>
                <button type='submit'>Add</button>
            </form>
            <table className='items-table'>
                <thead>
                    <tr>
                        <th>Item Description</th>
                        <th>Completed</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        </section>
    </div>
  )
}
