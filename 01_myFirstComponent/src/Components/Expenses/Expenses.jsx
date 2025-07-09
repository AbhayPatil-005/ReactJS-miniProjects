import './Expenses.css'
import ExpenseItems from './ExpenseItems';
import Card from '../UI/Card'

function Expenses(props){
return (<Card className='expenses'>
    {props.expenses.map((expense,index)=>{
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
    )}
    </Card>)
}

export default Expenses;