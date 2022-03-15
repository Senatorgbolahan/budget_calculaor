import React from 'react'
import ExpenseItem from './ExpenseItem';
import {MdDelete} from 'react-icons/md'

 const ExpenseList = ({expenses ,handleEdit, handleDelete, clearItems}) => {
     
    return (
        <div>
            <ul className="list">
                {expenses.map((expense) =>{
                    return <ExpenseItem 
                                key={expense.id} 
                                expense={expense}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                })}
            </ul>
            {expenses.length > 0 && <button onClick={clearItems} className='btn'>clear expenses <MdDelete className='btn-icon'/></button>}
        </div>
    )
}
export default ExpenseList;