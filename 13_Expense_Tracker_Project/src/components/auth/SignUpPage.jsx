import './SignUpPage.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SignUpPage=()=>{
    const API_KEY = import.meta.env.VITE_FIREBASE_AUTH_API_KEY;
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError]=useState('');
    const history = useHistory();
 
    const formHandle=async(e)=>{
        e.preventDefault()

        if(newPassword !== confirmPassword){
            setError("Passwords do not match")
            return;
        }
        try{
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: newPassword,
                    returnSecureToken: true,
                })

            })
            const data = await response.json()
            if(!response.ok){
                throw new error(data.error.message)
            }
            history.replace("/login");
            
        }catch(err){
            console.error("Failed to post auth details: ",err)
            
        }
        
        setError("");
        setEmail("");
        setConfirmPassword("");
        setNewPassword("");

    }
    return(<>
        <form onSubmit={formHandle} className='signup-form'>
            <h3>Sign Up</h3>
            <div className='inputs-div'>
                <div><label htmlFor="email">Email </label>
                    <input
                        type="email"
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required /></div>

                <div><label htmlFor="new-password">New Password </label>
                    <input
                        type="password"
                        id='new-password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        onKeyDown={() => setError("")}
                        required /></div>

                <div><label htmlFor="confirm-password">Confirm Password </label>
                    <input
                        type="password"
                        id='confirm-password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onKeyDown={() => setError("")}
                        required /></div>

                {error && <p style={{color:"red"}}>{error}</p>}
                <button type='submit'>
                    Create Account
                </button>
                
            </div>
        </form>
    </>)
}

export default SignUpPage;
