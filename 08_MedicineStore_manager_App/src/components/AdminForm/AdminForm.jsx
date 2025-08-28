import { useState, useContext } from "react";
import { StoreContext } from "../../data/StoreContext";
import styles from './AdminForm.module.css'

const initialState = {
        medName:"",
        id:"",
        description:"",
        price:0,
        quantity:0,
    }

const AdminForm = ()=>{
    const [form, setForm] = useState(initialState);
    const {addToStore} = useContext(StoreContext);

    const formSubmitHandler=(e)=>{
        e.preventDefault()
        if(!form.medName || !form.description || form.price<=0 || form.quantity < 0){
            alert("Please fill in all fields correctly!");
            return;
        }
        console.log("FormSumbitHandler_RUNNING!")
        const newProduct ={...form, id:Date.now()}
        addToStore(newProduct)
        setForm(initialState)
    }
    
    return(
        <form onSubmit={formSubmitHandler} className={styles.adminForm}>
            <span>Admin Section to add new products:</span>
            <div className={styles.formGroup}>
            <label htmlFor="medName">Medicine Name: </label>
            <input type="text" id="medName" name="medName" value={form.medName} onChange={(e)=>setForm({...form, medName:e.target.value})}/>
            </div>

            <div className={styles.formGroup}>
            <label htmlFor="description">Description: </label>
            <input type="text" id="description" name="description" value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})}/>
            </div>

            <div className={styles.formGroup}>
            <label htmlFor="price">Price: ₹</label>
            <input type="number" id="price" name="price" value={form.price} onChange={(e)=>setForm({...form, price:e.target.value})}/>
            </div>

            <div className={styles.formGroup}>
            <label htmlFor="quantity"> Quantity: </label>
            <input 
            id="quantity"
            type="number" 
            value={form.quantity} 
            onChange={e=> setForm({...form, quantity: e.target.value})}
            min="0"/>
            </div>
            <button type="submit" >Add Product</button>
        </form>
    )

}
export default AdminForm;