import { createContext } from "react";
import { useState } from "react";

const AuthContext = createContext({
  token:'',
  isLoggedIn:false,
  login:(token)=>{},
  logout:()=>{},  
})

const AuthContextProvider=({children})=>{
    const initialToken = localStorage.getItem("token");

    const [token, setToken]= useState(initialToken);
    const userIsLoggedIn = !!token;

    let logoutTimer ;
    const loginHandler =(token)=>{
        setToken(token);
        localStorage.setItem("token", token);
        if(logoutTimer)clearTimeout(logoutTimer)

        logoutTimer = setTimeout(logoutHandler,5*60*1000);
    };

    const logoutHandler=()=>{
        setToken(null);
        localStorage.removeItem("token");
        if (logoutTimer)clearTimeout(logoutTimer);
    };
    const contextValue = {
        token: token,
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