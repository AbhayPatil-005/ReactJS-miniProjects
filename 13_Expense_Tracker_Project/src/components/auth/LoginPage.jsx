import { NavLink } from 'react-router-dom';
import './LoginPage.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../authContext/AuthContextProvider';
import NavBar from '../dashboard/NavBar';


const LoginPage=()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

        
    const authCtx = useContext(AuthContext);

    const formLoginHandle= async(e)=>{
        e.preventDefault()
        try{
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_FIREBASE_AUTH_API_KEY}`,{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    email:email,
                    password:password,
                    returnSecureToken:true,
                }),
            })
            const data = await response.json();
            if(!response.ok){
                throw new Error(data.error.message || "Authentication failed"); 
            }       

            authCtx.login(data.idToken, data.email);
            
        }catch(err){
            alert(err)
            throw new Error(err.error);
        }

    }
    return <>
    <NavBar />
    <form onSubmit={formLoginHandle} className='login-form'>
        <h2>Login</h2>
        <div className='login-input'>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email}  onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
            <button type='submit'>Login</button>
        </div>
    </form>
    <div className='sign-up-block'>Don't have an account? <NavLink to='/sign-up'>signup</NavLink>?</div>
    </>
}

export default LoginPage;