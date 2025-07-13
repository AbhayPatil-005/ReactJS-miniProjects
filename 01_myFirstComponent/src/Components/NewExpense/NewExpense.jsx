import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
    const [isEditing, setIsEditing] = useState(false);

    const startEditingHandler = () =>{
        setIsEditing(true);
    };
    
    const stopEditingHandler = () =>{
        setIsEditing(false);
    }

    const ExpenseSubmitHandle = ( enteredExpenseData )=> {
        const expenseData = {
        ...enteredExpenseData, id:Math.random().toString()
        }
    props.onExpenseData(expenseData);
    setIsEditing(false);
    }
    

    return (
        <div className="new-expense">
            {!isEditing &&(
                <button onClick={startEditingHandler}>Add Expense</button>
            )}
            {isEditing && (<ExpenseForm onExpenseSubmit = {ExpenseSubmitHandle} onCancel={stopEditingHandler}/>)}
        </div>
        )
}
export default NewExpense;