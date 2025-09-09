import { useState } from "react";
import { Login } from "./Login";
import NavBar from "../navBar/NavBar";

const LoginForm =()=>{
    const [isLogin, setIsLogin] = useState(false);
    
    return (
        <>  
            <NavBar/>
            <Login />
        </>
    )
}
export default LoginForm;