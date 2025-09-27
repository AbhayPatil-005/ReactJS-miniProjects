import './Navbar.css';
import { NavLink } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { toggleTheme } from '../../store/themeSlice';

const NavBar = () => {
    const theme = useSelector((state)=>state.theme.mode);
    const dispatch = useDispatch();

    const history = useHistory();
    const logoutHandler = () => {
        dispatch(logout());
        history.replace('/login');
    }
    
    return(
        <>
        <nav>
            <button onClick={()=> dispatch(toggleTheme())}>switch theme</button>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/expenses'>Expenses</NavLink>
            <button onClick={logoutHandler}>Logout</button>
        </nav>
        </>
    )
}

export default NavBar;