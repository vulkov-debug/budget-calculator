import React, {useState} from 'react';
import './App.css';
import {ExpenseList} from './components/ExpenseList'
import {ExpenseForm} from './components/ExpenseForm'
import {Alert} from './components/Alert'
import uuid from 'uuid/v4'

const initialExpenses =[];


function App() {
  /// ************** state values ********************************
  // all expenses, add expense
  const [expenses, setExpenses]= useState(initialExpenses);
  // single expense
  const [charge, setCharge]=useState('');
   // single amount
   const [amount, setAmount]=useState('');
   // alert
   const [alert, setAlert] = useState({show: false});
   //edit
   const [edit, setEdit] = useState(false);
   const [editId, setEditId]= useState('');
/// ************** functionality ********************************
// handle charge
const handleCharge =e => {
  
 setCharge(e.target.value)
}
//handle amount
const handleAmount =e => {
  setAmount(e.target.value)
 }
 // handle alert
 const handleAlert= ({type, text})=> {
   setAlert({show: true, type, text});
   setTimeout(()=> {
     setAlert({show: false})   
   },2000)
 }
 // clear all expenses
 const clearExpenses =() => {
   setExpenses([]);
   handleAlert({type: 'danger', text: 'All expenses succefully deleted'})
 }
 // delete single expense
 const deleteSingleExpense =(id) => {
  const tempExpenses= expenses.filter(item=> item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({type:'danger', text:'Selected item deleted'})
 }
 // handleEdit
 const handleEdit =(id) => {
   const tempExpense=expenses.find(item=> item.id === id);
   setCharge(tempExpense.charge);
   setAmount(tempExpense.amount);
   setEdit(true);
   setEditId(id);
 }
 const handleSubmit =e=> {
   e.preventDefault();
   if (charge !== '' && amount >0){
     if (edit === true){
        const editItem = expenses.find(item => item.id === editId);
        const editExpense= {...editItem, charge, amount}
        const tempExpenses=expenses.filter(item=> item.id !== editId);
        setExpenses([...tempExpenses, editExpense])
        setCharge('');
        setAmount('');
        setEdit(false);
        handleAlert({type:'success', text:'Succefully edited item'})
     }else{
       const singleExpense = {id: uuid(), charge, amount}
        setExpenses([...expenses, singleExpense])
        setCharge('');
        setAmount('');
        handleAlert({type: 'success', text:'item added'})
     }
        
   }
   else{
     handleAlert({type:'danger', 
     text:"Charge must contains more than one letter and Amount must be greater than 0"})
   }
   
 }

  return (
    <>
    {alert.show && <Alert type={alert.type} text={alert.text}/>}
  
    <h1>budget calculator</h1>
    <main className="App">
       <ExpenseForm charge={charge} amount={amount} handleAmount={handleAmount} 
       handleCharge={handleCharge}
       handleSubmit={handleSubmit} edit={edit}/>
      <ExpenseList expenses={expenses} clearExpenses={clearExpenses} 
      deleteSingleExpense={deleteSingleExpense} handleEdit={handleEdit}/>
    </main>
    <h1>
  total spending : <span className='total'>$ {expenses.reduce((acc,curr)=>{
    return (acc +=parseInt(curr.amount));
  },0)}</span>
    </h1>
   
    </>
  );
}

export default App;
