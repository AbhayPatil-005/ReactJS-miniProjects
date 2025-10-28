import MoonIcon from '../icon/MoonIcon';
import SunIcon from '../icon/SunIcon'; 
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../store/themeSlice';


function ThemeToggler() {
    const dispatch = useDispatch();
    const isDarkMode = useSelector(state => state.theme.mode); 

    return (
        <button className="theme-tgl" onClick={() => dispatch(toggleTheme())}>
            {isDarkMode== "light" ? <MoonIcon /> :<SunIcon /> }
        </button>
    );
}
export default ThemeToggler;