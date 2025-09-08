import { useState } from "react";
import { useRef } from "react";
import styles from './Login.module.css'

export const Login=()=>{
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setLoading] =  useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();

    const switchAuthHandler=()=>{
        setIsLogin((prev)=>!prev);
    }

    const submitHandler =(event)=>{
        event.preventDefault();

        const emailEntered = emailRef.current.value;
        const passwordEntered = passwordRef.current.value;

        setLoading(true)
        if (isLogin){

        }else{
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZo67Rv5C_f4qyESDqVW5MCy2zG-ifU-o',{
                method:'Post',
                body:JSON.stringify({
                    email: emailEntered,
                    password: passwordEntered,
                    returnSecureToken:true,                
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            }).then(res=>{
                setLoading(false)
                if(res.ok){
                    //...
                }else{
                    return res.json().then((data)=>{
                        let errorMessage = 'Authentication failed';
                        console.log(data)
                        if (data && data.error && data.error.message){
                            errorMessage=data.error.message;
                        }
                        alert(errorMessage);
                    });
                }
            });
        }
    }
    return (<section>
        <form onSubmit={submitHandler} className={styles.form}>
            <h1>{isLogin?'Login':'Sign Up'}</h1>
            <div>
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" ref={emailRef} required />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" ref={passwordRef} required />
            </div>
            <div>
                {!isLoading && <button type="submit" onClick={switchAuthHandler}>{isLogin ? 'Login':'Create Account'}</button>}
                {isLoading && <p>Loading...</p>}
            </div>
        </form>
    </section>)
}