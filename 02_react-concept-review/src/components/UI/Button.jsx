import './Button.css'

const Button =(props)=>{
    return (
        <button className={props.type || "button"}>{props.children}</button>
    )
}
export default Button