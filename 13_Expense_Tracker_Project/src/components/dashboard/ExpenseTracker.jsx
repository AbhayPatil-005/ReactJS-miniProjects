import './ExpenseTracker.css';
import { useState, useContext, useEffect} from 'react';
import { AuthContext } from '../../authContext/AuthContextProvider';
import NavBar from './NavBar';

const ExpenseTracker=()=>{
    const BASE_URL = import.meta.env.VITE_FIREBASE_DATABASE_URL;
    const authCtx = useContext(AuthContext);

    const [editingId, setEditingId] = useState(null);
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Food");
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);

    const userId = authCtx.userId;

    useEffect(()=>{
        const fetchExpenses =  async () =>{
            setLoading(true);
            try{
                const response =  await fetch (`${BASE_URL}/expenses/${userId}.json`)
                const data =  await response.json();
                if(!response.ok){
                    throw new Error("Failed to fetch expenses");
                }
                const loadedExpenses = [];
                for (const key in data){
                    loadedExpenses.push({id:key, ...data[key]});
                }
                setExpenses(loadedExpenses);
            }catch(err){
                console.error(err);
            }finally{
                setLoading(false);
            }
        };
        if(authCtx.token){
            fetchExpenses();
        }
    }, [authCtx.token, userId]);

    const handleSubmit= async(e) => {
        e.preventDefault();
        setLoading(true);
        const expenseData  = {amount, description, category};
        try{
            let response;
            if(editingId){
             response = await fetch (`${BASE_URL}/expenses/${userId}/${editingId}.json`,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(expenseData ),
            });
            }else{
                response = await fetch(`${BASE_URL}/expenses/${userId}.json`,{
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body:JSON.stringify(expenseData),
                });
            }
            if (!response.ok){
                throw new Error("Failed to store expense");
            }

            const data = await response.json();

            if(editingId){
                setExpenses((prev)=>
                    prev.map((exp) => 
                        exp.id === editingId ? { id: editingId, ...expenseData } : exp
            ))
            }else{
                const expenseWithId = {id: data.name, ...expenseData };
                setExpenses((prev) => [...prev, expenseWithId]);
            }
            console.log("userId:", userId);
            console.log("token:", authCtx.token);

            setAmount("");
            setDescription("");
            setCategory("Food");
            setEditingId(null);

        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    };
    if(!authCtx.token){
        return <p>Please login to view and add expenses</p>;
    }

    const handleDelete =async (id) =>{
        try{
            const response = await fetch(`${BASE_URL}/expenses/${userId}/${id}.json`,{
                method: "DELETE"
            })
            if(!response.ok){
                throw new Error("Failed to delete expense");
            }
            console.log("Expense successfully deleted");
            setExpenses((prev)=> prev.filter((exp)=>exp.id !== id));
        }catch(err){
            console.error(err);
        }
    }

    const handleEdit =(exp)=>{
        setEditingId(exp.id);
        setAmount(exp.amount);
        setDescription(exp.description);
        setCategory(exp.category);
    };
    return (<>
        <NavBar/>
        <div className='expenses-div'>
            <h2>Add your Expenses</h2>
            <form onSubmit={handleSubmit} className='expense-form'>
                <div><label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        id='amount'
                        onChange={(e) => setAmount(e.target.value)}
                        required />
                </div>

                <div><label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                <button type='submit'>{editingId ? "Update Expense" : "Add Expense"}</button>
            </form>

            <h3 className='expense-heading'>Your Expenses</h3>
            {loading && <p>Loading expenses...</p>}
            <ul>
                {expenses.map((exp) => (
                    <li key={exp.id}>
                        <span>₹{exp.amount}</span> - {exp.description} - ({exp.category})<br/>
                        <button onClick={() => handleEdit(exp)}>Edit</button>
                        <button onClick={() => handleDelete(exp.id)}>Delete</button>

                    </li>
                ))}
            </ul>
        </div></>)
}

export default ExpenseTracker;