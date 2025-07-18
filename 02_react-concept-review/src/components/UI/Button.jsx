import './Button.css'

const Button =(props)=>{
    return (
        <button className={props.type || "button"} type={props.type || "button"}
      onClick={props.onClick}>{props.children}</button>
    )
}
export default Button