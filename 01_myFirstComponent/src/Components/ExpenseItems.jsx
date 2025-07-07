// Write your code here:
import './ExpenseItem.css'
function ExpenseItem(props) {
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
    const month = months[props.date.getMonth()];
    const year = props.date.getFullYear();
    const date = props.date.getDate();
    const day = String(date).padStart(2,"0");

  return (
    <>
    <div className='expense-item'>

      <div>{year}</div>
      <div>{month}</div>
      <div>{day}</div>

      <div className='expense-item__location'>
        {props.location}
      </div>

      <div className='expense-item__description'>

        <h2 className='expense-item__h2'>{props.title}</h2>

        <div className='expense-item__price'>
          ${props.price}
        </div>

      </div>
    </div>
    </>
  )
}
export default ExpenseItem