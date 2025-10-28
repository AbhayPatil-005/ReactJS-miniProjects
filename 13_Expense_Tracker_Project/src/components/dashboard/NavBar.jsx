import './Navbar.css';
import { NavLink } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { toggleTheme } from '../../store/themeSlice';
import ThemeToggler from '../Buttons/ThemeToggler';

const NavBar = () => {
    // const theme = useSelector((state)=>state.theme.mode);
    const dispatch = useDispatch();
    const isPremium = useSelector((state)=>state.auth.isPremium);
    const history = useHistory();

    const logoutHandler = () => {
        dispatch(logout());
        history.replace('/login');
    }
    
    return(
        <nav className="navbar">
        <div className="navbar-center">
            <NavLink to="/" activeClassName="active-link">Home</NavLink>
            <NavLink to="/expenses" activeClassName="active-link">Expenses</NavLink>
        </div>
        <div className="navbar-right">
            { isPremium &&
            <ThemeToggler/> 
            }
            <button className="logout-btn" onClick={logoutHandler}>Logout</button>
        </div>
        </nav>
    );

}

export default NavBar;