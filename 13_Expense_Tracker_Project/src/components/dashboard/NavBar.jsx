import './Navbar.css';
import { NavLink } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

const NavBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const logoutHandler = () => {
        dispatch(logout());
        history.replace('/login');
    }
    return(
        <>
        <nav>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/expenses'>Expenses</NavLink>
            <button onClick={logoutHandler}>Logout</button>
        </nav>
        </>
    )
}

export default NavBar;