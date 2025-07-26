
import OrderForm from './components/OrderForm'
import Tables from './components/tables'
import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [orders, setOrders] = useState({
        "Table 1": [],
        "Table 2": [],
        "Table 3": [],
    })

  useEffect(()=>{
      loadOrders();
  },[]);

  const loadOrders=()=>{
        const grouped ={
            "Table 1": [],
            "Table 2": [],
            "Table 3": [],
        };

  for(let i =0;i<localStorage.length; i++){
      const key = localStorage.key(i);
      const order = JSON.parse(localStorage.getItem(key));
      if(order && grouped[order.table]){
          grouped[order.table].push(order);
      }
  }
  setOrders(grouped)
  };
 

  return (
    <>
      <OrderForm  onLoad = {loadOrders}/>
      <h1>Orders</h1>
      <Tables  onLoad = {loadOrders} orders={orders}/>
    </>
  )
}

export default App
