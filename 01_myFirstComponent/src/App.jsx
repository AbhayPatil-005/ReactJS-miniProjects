import Expenses from "./Components/Expenses/Expenses";
import NewExpense from "./Components/NewExpense/NewExpense";
import { useState } from "react";

function App() {
  const expenses = [
    { id: "1", date: new Date(2023, 7, 15), 
      title: "Insurance", price: 100 ,location: "Bangalore"},

    { id: "2", date: new Date(2023, 3, 25), 
      title: "Book", price: 10, location:"Delhi" },

    { id: "3", date: new Date(2023, 10, 11), 
      title: "Pen", price: 1, location:"Hyderabad" },

    { id: "4", date: new Date(2023, 1, 14), 
      title: "Laptop", price: 200, location:"Mumbai"},
  ];
  const [newExpenseList, setNewExpenseList] = useState([...expenses])
  const expenseDataRecieved=(recievedData)=>{
    setNewExpenseList((prevList) => [recievedData, ...prevList])
  }
  return (
    <div>
      <h1>Let's get Started</h1>
      <NewExpense onExpenseData={expenseDataRecieved}/>
      <Expenses expenses={newExpenseList}></Expenses>
    </div>
  );
}

export default App;
