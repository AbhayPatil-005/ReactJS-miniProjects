import NavBar from "./NavBar";
import { useHistory } from "react-router-dom";

const HomePage = () =>{
    const history = useHistory();    
    const goToCompleteProfilePage=()=>{
        history.push('/complete-profile');
    }
    return(
        <>
        <NavBar />
        <h1>Welcome to Expense Tracker!</h1>
        <p>Your Profile is incomplete!</p>
        <button onClick={goToCompleteProfilePage}>Complete Profile</button>
        </>
    )
}

export default HomePage;