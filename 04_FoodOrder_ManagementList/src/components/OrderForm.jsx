const OrderForm =(props)=>{
    function formHandleSubmit(event){
        event.preventDefault()
        const orderItems = {
            price:event.target.price.value,
            dish:event.target.dishName.value,
            table:event.target.table.value,
            Id:event.target.orderId.value,
        }
        localStorage.setItem(orderItems.Id, JSON.stringify(orderItems))
        props.onLoad();
        event.target.reset();
    }
    return(
    <form onSubmit={formHandleSubmit}>
        <label htmlFor="orderId"> Unique Order ID: </label>
        <input type="number" name="orderId" id="orderId" />

        <label htmlFor="price"> Choose Price: </label>
        <input type="number" name="price" min="0" id="price" />

        <label htmlFor="dishName"> Choose Dish: </label>
        <input type="text" name="dishName" id="dishName" />

        <label htmlFor="table"> Choose a Table: </label>
        <select name="table" id="table">
            <option value="Table 1">Table 1</option>
            <option value="Table 2">Table 2</option>
            <option value="Table 3">Table 3</option> 
        </select> 

        <button type="submit" id="AddBill"> Add to Bill </button>
    </form>
    )
}
export default OrderForm