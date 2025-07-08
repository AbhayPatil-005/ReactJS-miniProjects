// Write your code here:
import ExpenseDate from './ExpenseDate'
import './ExpenseItem.css'
import Card from './Card'

function ExpenseItem(props) {
  return (
    <>
    <Card className='expense-item'>
      <ExpenseDate expenseDate={props.date}/>
      
      <div className='expense-item__location'>
        {props.location}
      </div>

      <div className='expense-item__description'>
        <h2 className='expense-item__h2'>{props.title}</h2>
        <div className='expense-item__price'>${props.price}</div>
      </div>

    </Card>
    </>
  )
}
export default ExpenseItem