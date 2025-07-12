import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
    const ExpenseSubmitHandle = ( enteredExpenseData )=> {
        const expenseData = {
        ...enteredExpenseData, id:Math.random().toString()
        }
    props.onExpenseData(expenseData)
    }
    

    return (
        <div className="new-expense">
            <ExpenseForm onExpenseSubmit = {ExpenseSubmitHandle}/>
        </div>
        )
}
export default NewExpense;