import './Expenses.css'
import ExpenseItems from './ExpenseItems';

function Expenses(props){
return (
    props.expenses.map((expense,index)=>{
        return (
        <ExpenseItems 
          key={expense.id}
          date={expense.date}
          title={expense.title}
          price={expense.price}
          location={expense.location}
        ></ExpenseItems>
        )
      }
    ))
}

export default Expenses;