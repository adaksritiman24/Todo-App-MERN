import React, { useState } from 'react'
export default function TodoItem(props) {

    const [item, setItem] = useState(props.item);

    const handleCheckBoxEvent = (event) => {
        
        props.updateTodo(item._id, !item.completed)

        setItem(
            {...item, completed : !item.completed}
        )
    }

    return (
        <tr>
            <td>{item.description}</td>
            <td className='completed'>

                <input type="checkbox" checked={item.completed} onChange={handleCheckBoxEvent} />


            </td>
            <td className='delete-btn-todo'>
                <button onClick={() => props.deleteTodo(item._id)}>Delete</button>
            </td>
        </tr>
    )
}
