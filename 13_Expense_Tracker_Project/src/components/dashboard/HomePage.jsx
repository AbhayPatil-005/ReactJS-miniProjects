import NavBar from "./NavBar";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContextProvider";
import { useContext, useState } from "react";

const HomePage = () =>{
    const authCtx = useContext(AuthContext);
    const [message, setMessage] = useState("");

    const sendVerificationEmail = async ()=>{
        try{
            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${import.meta.env.VITE_FIREBASE_AUTH_API_KEY}`,
                {
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({
                        requestType: "VERIFY_EMAIL",
                        idToken:authCtx.token,
                    }),
                }
            )
            const data = await response.json();
            console.log("data of verifyEmail request: ", data.email)
            if(!response.ok){
                throw new Error(data.error.message || "Failed to send verification email")
            }
            
            setMessage("Verification email sent! Please check your inbox.");
            
            
        }catch(err){
            console.error(err);
            if(err.message.includes("INVALID_ID_TOKEN")){
                setMessage("Session expired. Please log in again");
                authCtx.logout()
            }else if (err.message.includes("USER_NOT_FOUND")){
                setMessage("User not found. Please sign up again.")
                authCtx.logout()
            }else if(err.message.includes("TOO_MANY_ATTEMPTS_TRY_LATER")){
                setMessage("Too many attempts. Try again later.")
            }else{
                setMessage("Something went wrong. Please try again.")
            }
        }
    }
    const history = useHistory();    
    const goToCompleteProfilePage=()=>{
        history.push('/complete-profile');
    }
    return(
        <>
            <NavBar />
            <h1>Welcome to Expense Tracker!</h1>
            {authCtx.profileComplete && (
                <>
                    <p>Your Profile is incomplete!</p>
                    <button onClick={goToCompleteProfilePage}>Complete Profile</button>
                </>
            )}

            {console.log("is Email verified? -", authCtx.emailVerified)}
            {!authCtx.emailVerified && (<div style={{ marginTop: "20px" }}>
                <button onClick={sendVerificationEmail}>Verify Email</button>
                {message && <p>{message}</p>}
            </div>)}
        </>
    )
}

export default HomePage;