
const Tables=({orders,onLoad})=>{

    const handleDelete = (id)=>{
        localStorage.removeItem(id);
        onLoad();
    };

    return (
        <>
        <ul>
            <h2>Table 1</h2>
            {orders["Table 1"].map((order)=>(
                <li key={order.Id}>{order.price} - {order.table} - {order.dish} <button onClick={()=>handleDelete(order.Id)}>Delete Order</button></li>
            ))}
            

            <h2>Table 2</h2>
            {orders["Table 2"].map((order)=>(
            <li key={order.Id}>{order.price} - {order.table} - {order.dish} <button onClick={()=>handleDelete(order.Id)}>Delete Order</button></li>
            ))}

            <h2 >Table 3</h2>
            {orders["Table 3"].map((order)=>(
                <li key={order.Id}>{order.price} - {order.table} - {order.dish} <button onClick={()=>handleDelete(order.Id)}>Delete Order</button></li>
            ))}
        </ul>
        </>
        
    )
}
 export default Tables