import { useState, useContext,useRef } from "react";
import styles from './Login.module.css';
import {AuthContext} from '../../context/AuthContext';
import { useHistory } from "react-router-dom";

export const Login = () => {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const authCtx = useContext(AuthContext);
  const history = useHistory();
 
  const emailRef = useRef();
  const passwordRef = useRef();
  
  const switchAuthHandler = () => {
    setIsLogin((prev) => !prev);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const emailEntered = emailRef.current.value;
    const passwordEntered = passwordRef.current.value;
    console.log(passwordEntered)
    console.log(emailEntered)
    setLoading(true);

    let url = isLogin
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: emailEntered,
        password: passwordEntered,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
        setLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(data.error.message || "Authentication failed!");
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken)
        history.replace('/')
        alert('Authentication successful!');
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      });
  };

  return (
    <section>
      <form onSubmit={submitHandler} className={styles.form}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <div>
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" ref={emailRef} required />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" ref={passwordRef} required />
        </div>
        <div>
          {!isLoading && (
            <>
              <button type="submit">{isLogin ? "Login" : "Create Account"}</button>
              <button
                type="button"
                onClick={switchAuthHandler}
                style={{ marginLeft: "10px" }}
              >
                {isLogin ? "Create new account" : "Login with existing account"}
              </button>
            </>
          )}
          {isLoading && <p>Loading...</p>}
        </div>
      </form>
    </section>
  );
};
