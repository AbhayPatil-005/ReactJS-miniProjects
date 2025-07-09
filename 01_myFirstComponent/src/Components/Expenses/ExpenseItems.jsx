// Write your code here:
import {useState} from 'react'
import ExpenseDate from './ExpenseDate'
import './ExpenseItem.css'
import Card from '../UI/Card'

function ExpenseItem(props) {
  const [title, setTitle] = useState(props.title)
  const buttonClickHandler = ()=>{
    setTitle('New Title')
  }
  return (
    <>
    <Card className='expense-item'>
      <ExpenseDate expenseDate={props.date}/>
      
      <div className='expense-item__location'>
        {props.location}
      </div>

      <div className='expense-item__description'>
        <h2 className='expense-item__h2'>{title}</h2>
        <div className='expense-item__price'>${props.price}</div>
      </div>
      <button onClick={buttonClickHandler}>Change Title</button>
    </Card>
    </>
  )
}
export default ExpenseItem