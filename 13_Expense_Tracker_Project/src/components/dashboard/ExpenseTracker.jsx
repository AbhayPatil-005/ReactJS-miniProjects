import './ExpenseTracker.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setExpenses, addExpense, updateExpense, deleteExpense } from '../../store/expensesSlice';
import NavBar from './NavBar';
import { ExportCSV } from '../utilityFolder/csvUtility';


const ExpenseTracker = () => {
    const BASE_URL = import.meta.env.VITE_FIREBASE_DATABASE_URL;
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const expenses = useSelector((state) => state.expenses.expenses);

    const [editingId, setEditingId] = useState(null);
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Food");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchExpenses = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/expenses/${auth.userId}.json`);
                const data = await response.json();
                if (!response.ok) {
                    throw new Error("Failed to fetch expenses");
                }
                const loadedExpenses = [];
                if (data) {
                    for (const key in data) {
                        loadedExpenses.push({ id: key, ...data[key] });
                    }
                }
                dispatch(setExpenses(loadedExpenses));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (auth.bearerToken) {
            fetchExpenses();
        }
    }, [auth.bearerToken, auth.userId, BASE_URL, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const expenseData = { amount, description, category };
        try {
            let response;
            if (editingId) {
                response = await fetch(`${BASE_URL}/expenses/${auth.userId}/${editingId}.json`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(expenseData),
                });
            } else {
                response = await fetch(`${BASE_URL}/expenses/${auth.userId}.json`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(expenseData),
                });
            }
            if (!response.ok) {
                throw new Error("Failed to store expense");
            }

            const data = await response.json();

            if (editingId) {
                dispatch(updateExpense({ id: editingId, ...expenseData }));
            } else {
                const expenseWithId = { id: data.name, ...expenseData };
                dispatch(addExpense(expenseWithId));
            }

            setAmount("");
            setDescription("");
            setCategory("Food");
            setEditingId(null);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!auth.bearerToken) {
        return <p>Please login to view and add expenses</p>;
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/expenses/${auth.userId}/${id}.json`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error("Failed to delete expense");
            }
            dispatch(deleteExpense(id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (exp) => {
        setEditingId(exp.id);
        setAmount(exp.amount);
        setDescription(exp.description);
        setCategory(exp.category);
    };

    // Calculating total expenses
    const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

    return (
        <>
            <NavBar />
            <div className='expenses-div'>
                <h2 className='add-expense-heading'>Add your Expenses</h2>
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
                    <button type='submit' className='submit-btn'>{editingId ? "Update Expense" : "Add Expense"}</button>
                </form>

                <h3 className='expense-heading'>Your Expenses</h3>
                {loading && <p>Loading expenses...</p>}
                <ul>
                    {expenses.map((exp) => (
                        <li key={exp.id} className='li'>
                            <span>₹{exp.amount}</span> - {exp.description} - ({exp.category})<br />
                            <button onClick={() => handleEdit(exp)}>Edit</button>
                            <button onClick={() => handleDelete(exp.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
                {totalExpenses > 10000 && (
                    <button className="premium-btn">Activate Premium</button>
                )}
                <ExportCSV/>
            </div>
        </>
    );
};

export default ExpenseTracker;