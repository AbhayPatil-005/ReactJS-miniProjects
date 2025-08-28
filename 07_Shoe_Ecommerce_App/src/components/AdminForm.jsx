import { useState, useContext } from "react";
import { StoreContext } from "../data/StoreContext";

const initialState = {
        shoeName:"",
        id:"",
        description:"",
        price:0,
        quantity:{small:0, medium:0, large:0},
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
            <label htmlFor="shoeName">Shoe Name</label>
            <input type="text" id="shoeName" name="shoeName" value={form.shoeName} onChange={(e)=>setForm({...form, shoeName:e.target.value})}/>
            
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})}/>

            <label htmlFor="price">Price</label>
            <input type="number" id="price" name="price" value={form.price} onChange={(e)=>setForm({...form, price:e.target.value})}/>
            
            <div>
                <span>Size Quantity Available</span>
                <div className="quantity">
                    <label>S
                    <input 
                    type="number" 
                    value={form.quantity.small} 
                    onChange={e=> setForm({...form, quantity: {...form.quantity, small:e.target.value}})}
                    min="0"/>
                    </label>

                    <label>M
                    <input type="number" 
                    value={form.quantity.medium} 
                    onChange={e=>setForm({...form, quantity: {...form.quantity, medium:e.target.value}})}
                    min="0"/>
                    </label>

                    <label>L
                    <input 
                    type="number" 
                    value={form.quantity.large} 
                    onChange={e=> setForm({...form, quantity: {...form.quantity, large:e.target.value}})}
                    min="0"/>
                    </label>
                </div>
            </div>

            <button type="submit" >Add Product</button>
            
        </form>
    )

}
export default AdminForm;