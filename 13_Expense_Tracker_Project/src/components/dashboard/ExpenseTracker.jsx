import './ExpenseTracker.css';
import { useState, useContext } from 'react';
import { AuthContext } from '../../authContext/AuthContextProvider';

const ExpenseTracker=()=>{
    const authCtx = useContext(AuthContext);
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Food");
    const [expenses, setExpenses] = useState([]);

    const handleSubmit= (e) => {
        e.preventDefault();
        const newExpense = {amount, description, category};
        setExpenses((prev)=>[...prev, newExpense]);

        setAmount("");
        setDescription("");
        setCategory("Food");
    };
    if(!authCtx.token){
        return <p>Please login to view and add expenses</p>;
    }
    return(<div className='expenses-div'>
        <h2>Add your Expenses</h2>
        <form onSubmit={handleSubmit} className='expense-form'>
            <div><label htmlFor="amount">Amount:</label>
            <input 
                type="number"
                value={amount}
                id='amount'
                onChange={(e)=> setAmount(e.target.value)} 
                required />
                </div>

            <div><label htmlFor="description">Description:</label>
            <input 
                type="text"
                id='description'
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                required />
                </div>
            <div>
                <label htmlFor="category">Category:</label>
                <select 
                    value={category} 
                    id="category"
                    onChange={(e) => setCategory(e.target.value)}
                    required >
                        <option value="Food">Food</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Salary">Salary</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>
            </div>
            <button type='submit'>Add Expense</button>
        </form>

        <h3>Your Expenses</h3>
        <ul>
            {expenses.map((exp, index)=> (
                <li  key={index}>
                    <span>₹{exp.amount}</span> - {exp.description} - ({exp.category})
                </li>
            ))}
        </ul>
    </div>)
}

export default ExpenseTracker;