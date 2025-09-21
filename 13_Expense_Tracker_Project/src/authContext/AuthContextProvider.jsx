    import { createContext, useState } from "react";
    import { useHistory } from "react-router-dom";


    export const AuthContext = createContext({
        token:'',
        email:'',
        isLoggedIn:false,
        emailVerified: false,
        profileComplete:false,
        login:(token)=>{},
        logout:()=>{},
        setEmailVerified:(status)=>{},
        setProfileComplete:(status)=>{},
    });

    const AuthContextProvider = ({children})=>{
        const initialToken = localStorage.getItem("token");
        const initialEmail = localStorage.getItem("email");

        const [token, setToken] = useState(initialToken);
        const [email, setEmail] = useState(initialEmail);
        const [emailVerified, setEmailVerified] = useState( false);
        const [profileComplete, setProfileComplete] = useState(false);

        const userIsLoggedIn = !!token;
        console.log("userIsLoggedIn: ",userIsLoggedIn)

        const history = useHistory();

        // add timer
        const loginHandler=(token, email)=>{
            setEmail(email);
            setToken(token);
            localStorage.setItem("token", token);
            localStorage.setItem("email", email);
            history.replace('/');
        }
        
        const logoutHandler=()=>{
            setToken(null);
            setEmail(null);
            setEmailVerified(false);
            localStorage.removeItem("token");
            localStorage.removeItem("email");
        }
        
        const contextValue = {
            token,
            email,
            emailVerified,
            profileComplete,
            isLoggedIn:userIsLoggedIn,
            login:loginHandler,
            logout:logoutHandler,
            setEmailVerified,
            setProfileComplete,
        }

        return <AuthContext.Provider value={contextValue}>
                {children}
            </AuthContext.Provider>
    }

    export default AuthContextProvider;