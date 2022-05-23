import React from 'react'

export default function TodoItem(props) {
    const item = props.item;
  return (
    <tr>
        <td>{item.description}</td>
        <td className='completed'>
            {item.completed? 
                <input type="checkbox" checked={true} /> :
                <input type="checkbox"  />
            }
            
        </td>
        <td className='delete-btn-todo'>
            <button onClick={()=>props.deleteTodo(item._id)}>Delete</button>
        </td>
    </tr>
  )
}
