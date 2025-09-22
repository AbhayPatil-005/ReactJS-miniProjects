import './ForgotPassword.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';




const ForgotPassword = () =>{
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const history = useHistory();
    
    const handlePasswordReset = async(e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        
        try{
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${import.meta.env.VITE_FIREBASE_AUTH_API_KEY}`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    requestType:"PASSWORD_RESET",
                    email:email,
                }),
            });
            const data = await response.json();
            if(!response.ok){
                throw new Error(data.error.message || "Failed to reset password")
            }
            setMessage("Password rest link sent! Check your email inbox")
            useEffect(() => {
                let timer;
                if (message.includes("Password reset link")) {
                    timer = setTimeout(() => {
                        history.replace("/login");
                    }, 3000)
                }
                return () => clearTimeout(timer);
            },[message]);
            
        }catch(err){
            console.error(err);
            setMessage("❌" + err.message);
        }finally{
            setLoading(false);
        }
    }
    return (<>
        <div className='reset-div'>
            <h2>Reset Your Password</h2>
            <form onSubmit={handlePasswordReset}>
                <label htmlFor="email">Enter your email address: </label>
                <input 
                    type="email" 
                    id='email'
                    value={email}
                    required
                    onChange={(e)=> setEmail(e.target.value)}
                    />
                <button type='submit' disabled={loading}>
                    {loading ? "Sending...": "Send Reset Link"}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    </>);
};
export default ForgotPassword;