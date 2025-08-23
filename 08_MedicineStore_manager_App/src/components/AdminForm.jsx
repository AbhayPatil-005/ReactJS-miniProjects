import { useState, useContext } from "react";
import { StoreContext } from "../data/StoreContext";

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
        console.log("FormSumbitHandler_RUNNING!")
        const newProduct ={...form, id:Date.now()}
        addToStore(newProduct)
        setForm(initialState)
    }
    
    return(
        <form onSubmit={formSubmitHandler}>
            <label htmlFor="medName">Medicine Name</label>
            <input type="text" id="medName" name="medName" value={form.medName} onChange={(e)=>setForm({...form, medName:e.target.value})}/>
            
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})}/>

            <label htmlFor="price">Price</label>
            <input type="number" id="price" name="price" value={form.price} onChange={(e)=>setForm({...form, price:e.target.value})}/>

            <label> Quantity :
            <input 
            type="number" 
            value={form.quantity} 
            onChange={e=> setForm({...form, quantity: e.target.value})}
            min="0"/>
            </label>

            <button type="submit" >Add Product</button>
        </form>
    )

}
export default AdminForm;