import { createContext } from "react";
import { useState } from "react";


const AuthContext = createContext({
  token:'',
  email:'',
  isLoggedIn:false,
  login:(token)=>{},
  logout:()=>{},  
})

const AuthContextProvider=({children})=>{
    const initialToken = localStorage.getItem("token");
    const initialEmail = localStorage.getItem("email");

    const [token, setToken]= useState(initialToken);
    const [email, setEmail] = useState(initialEmail);
    const userIsLoggedIn = !!token;

    let logoutTimer ;
    const loginHandler =(token, email)=>{
        setToken(token);
        setEmail(email);
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        if(logoutTimer)clearTimeout(logoutTimer)

        logoutTimer = setTimeout(logoutHandler,5*60*1000);
    };

    const logoutHandler=()=>{
        setToken(null);
        setEmail(null);
        localStorage.removeItem("token");
        localStorage.removeItem("email")
        if (logoutTimer)clearTimeout(logoutTimer);
    };
    const contextValue = {
        token,
        email,
        isLoggedIn: userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContextProvider, AuthContext};