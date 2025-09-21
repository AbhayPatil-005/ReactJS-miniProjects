import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../authContext/AuthContextProvider";
import { useHistory } from "react-router-dom";


const CompleteProfilePage=()=>{
    const authCtx =  useContext(AuthContext);
    const history = useHistory();
    const [fullName, setFullName] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
             const fetchProfile = async () => {
                 try {
                     const response = await fetch(
                         `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${import.meta.env.VITE_FIREBASE_AUTH_API_KEY}`,
                         {
                             method: "POST",
                             headers: { "Content-Type": "application/json" },
                             body: JSON.stringify({ idToken: authCtx.token }),
                         }
                     );

                     const data = await response.json();
                     
                    
                     if (response.ok && data.users && data.users.length>0) {
                        const users = data.users[0];
                        setFullName(users.displayName || "");
                        setPhotoUrl(users.photoUrl || "");
                        authCtx.setEmailVerified(users.emailVerified);
                        console.log(`email verified:${users.emailVerified} \n Fetched data from database` )
                     }
                 } catch (err) {
                     console.error("Failed to fetch profile:", err);
                 } finally {
                     setLoading(false);
                 }
             };

             fetchProfile();
         }, [authCtx.token]);

    const updateProfileHandler = async(e)=>{
        e.preventDefault();
        try{
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${import.meta.env.VITE_FIREBASE_AUTH_API_KEY}`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    idToken:authCtx.token,
                    displayName:fullName,
                    photoUrl:photoUrl,
                    returnSecureToken:true,
                }),
            }
        );
            const data = await response.json();
            if(!response.ok){
                throw new Error(data.error.message || "Profile update failed");
            };
            alert("Profile updated successfully!");
            history.replace('/');
            console.log("Name:", data.displayName)

        }catch(err){
            console.error(err);
            alert("Something went wrong!");
        };
    };    
    return(
    <>
        <form onSubmit={updateProfileHandler}>
            <h2>Complete Your Profile</h2>
            <div>
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" value={fullName} 
                onChange={(e)=>setFullName(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="url">Profile Photo URL</label>
                <input type="url" id="url" value={photoUrl} 
                onChange={(e)=>setPhotoUrl(e.target.value)} required/>
            </div>
            <button type="submit">Update</button>
        </form>
    </>
    )
}

export default CompleteProfilePage;