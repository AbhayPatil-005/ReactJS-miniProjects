import './Navbar.css';
import { NavLink } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthContextProvider';
import { useContext } from 'react';

const NavBar=()=>{
    const authCtx = useContext(AuthContext);
    const history = useHistory();
    const logoutHandler=()=>{
        authCtx.logout();
        history.replace('/login') 
    }
    return(
        <>
        <nav>
            <NavLink to='/'>Home</NavLink>
            <button onClick={logoutHandler}>Logout</button>
        </nav>
        </>
    )
}

export default NavBar;