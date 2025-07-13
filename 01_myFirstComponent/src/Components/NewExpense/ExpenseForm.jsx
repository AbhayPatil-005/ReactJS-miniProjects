import {useState} from "react";
import "./ExpenseForm.css";

function ExpenseForm(props){
    // const [enterTitle, setEnteredTitle] =useState(props.title);
    // const [enterAmount, setEnteredAmount] = useState(props.price);
    // const [enteredDate, setEnteredDate] = useState(props.date);
    const [userInput, setUserInput] = useState({
        enteredTitle:"",
        enteredAmount: "",
        enteredDate: ""
    });

    const titleChangeHandler = (event)=>{
        setUserInput((prevState)=>({
            ...prevState,
            enteredTitle:event.target.value
        }))
        //     setUserInput({
    //         ...userInput,
    //     enteredTitle:event.target.value
    // });
    // setEnteredTitle(event.target.value);
    };
    const amountChangeHandler = (event)=>{
        setUserInput((prevState)=>({
            ...prevState,
            enteredAmount:event.target.value
        }))
        // setUserInput({
        //     ...userInput,
        // enteredAmount:event.target.value
        // });
        // setEnteredAmount(event.target.value);
    };
    const dateChangeHandler = (event)=>{
       setUserInput((prevState)=>({
            ...prevState,
            enteredDate:event.target.value
        }))
        // setUserInput({...userInput,
        // enteredTitle:event.target.value});
        // setEnteredDate(event.target.value);
    }
    const formSubmitHandler=(event)=>{
        event.preventDefault();
        const enteredData = {
            title: userInput.enteredTitle,
            price: userInput.enteredAmount,
            date:new Date(userInput.enteredDate),
        }
        const enteredExpenseData ={
            ...enteredData, id:Math.random().toString()
        }
        props.onExpenseSubmit(enteredExpenseData)

        setUserInput({
        enteredTitle:(''),
        enteredAmount:(''),
        enteredDate:('')})
    }
return (
    <form onSubmit={formSubmitHandler}>
        <div className="new-expense__controls">
            <div className="new-expense__control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" value={userInput.enteredTitle} onChange={titleChangeHandler}/>
            </div>
            <div className="new-expense__control">
                <label htmlFor="amount">Amount</label>
                <input type="number" id="amount" value={userInput.enteredAmount} onChange={amountChangeHandler}/>
            </div>
            <div className="new-expense__control">
                <label htmlFor="date">Date</label>
                <input type="date" value={userInput.enteredDate} id="date" min="2023-01-01" max="2024-12-31" onChange={dateChangeHandler} />
            </div>
        </div>
        <div className="new-expense__actions">
            <button type="submit">Add Expense</button>
        </div>
    </form>
)
}
export default ExpenseForm;