import { useState } from "react";
import { Login } from "./Login";

const LoginForm =()=>{
    const [isLogin, setIsLogin] = useState(false);
    
    return (
        <>  
            <Login />
        </>
    )
}
export default LoginForm;