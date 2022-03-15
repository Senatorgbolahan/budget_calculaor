import './App.css';
import React, {useState, useEffect} from 'react';

import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert'
import {v4 as uuidv4} from 'uuid'

// const initialExpenses = [
//   {id: uuidv4(), charge: "rent", amount: 1600},
//   {id: uuidv4(), charge: "car payment", amount: 1800},
//   {id: uuidv4(), charge: "credit card bill", amount: 9000},
// ];

// const initialExpenses = localStorage.getItem('expenses') 
//     ? JSON.parse(localStorage.getItem("expenses")) : []

let initialExpenses;

if (localStorage.getItem('expenses') ) {
  initialExpenses = JSON.parse(localStorage.getItem("expenses")) 
} else {
  initialExpenses = []
}



function App() {
  // ************************* state values *********************
  // all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);

  // single expense
  const [charge, setCharge] = useState('')
  // single amount
  const [amount, setAmount] = useState('')
  // alert
  const [alert, setAlert] = useState({show: false});
  // edit
  const [edit, setEdit] = useState(false)
  // edit item
  const [id, setId] = useState(0);

  // ************************* useEffect *********************

  useEffect(() => {
    console.log("We called useEffect");
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [])


  // ************************* functionality *********************
  // handle charge
  const handleCharge = (e) =>{
      setCharge(e.target.value);
  }
  // handle amount
  const handleAmount = (e) =>{
    setAmount(e.target.value);
  }

  // handle alert
  const handleAlert = ({type, text}) =>{
      setAlert({show:true, type:type, text: text})
      setTimeout(() => {
        setAlert({show: false})
      }, 3000);
  }

  // handle submit
  const handleSubmit = (e) =>{
    e.preventDefault();
    if (charge !== "" && amount > 0) {
        if (edit) {
          let tempExpenses = expenses.map((item) =>{
            return item.id === id ? {...item, charge:charge, amount:amount} : item;
          });
          setExpenses(tempExpenses);
          setEdit(false);
          handleAlert({type: 'success', text: 'Item editted'})
        } else {
          const singleExpense = { id: uuidv4(),charge: charge,amount: amount}
          setExpenses([ ...expenses, singleExpense]);
          handleAlert({type: 'success', text: 'Item added'})
        }
        setCharge("")
        setAmount("")
    }
    else{
      //handle alert called
      handleAlert({type: 'danger', text: `charge can't be empty value and amount value has to be bigger than zero` })
    }
  }

  //clear all items
  const clearItems = () =>{
    setExpenses([])
    handleAlert({type: 'danger', text: 'all items deleted'})
  }

  // handle delete
  const handleDelete = (id) =>{
    let temp = expenses.filter((item) => (item.id !== id))
    setExpenses(temp)
    handleAlert({type: 'danger', text: 'item deleted'})
  }

  // handle edit
  const handleEdit = (id) =>{
    let expense = expenses.find((item) => item.id ===id )
    let {charge, amount} = expense;
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
    setId(id)

  }
  
  return (
   <article>
     {alert.show && <Alert type={alert.type} text={alert.text}/>}
     <Alert />
     <h1>budget calculator</h1>
     <main className="App">
     <ExpenseForm 
          amount={amount}
          charge={charge}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit = {edit}
      />
     <ExpenseList 
        expenses={expenses}
        handleDelete={handleDelete}
        handleEdit={handleEdit}    
        clearItems={clearItems}
    />

     </main>
     <h1>total sepending: <span className="total">${expenses.reduce((acc, curr)=>{
       return (acc = acc + parseInt(curr.amount));
     },0)}</span></h1>
      </article>
  );
}

export default App;
