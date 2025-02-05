import {UserContext} from '../contexts/UserContext';
import {useContext} from 'react';
import { NavLink } from 'react-router';
import { logout } from '../utils/logout';

export default function Navigation() {
    const {user, setUser} = useContext(UserContext);
    return (
       <nav>
        {user&&<NavLink className="btn" to="/tours">
        Tours
        </NavLink>}

        {!user?(
            <NavLink className="btn" to="/login">
        Login
        </NavLink>
        ) : (
        

        <button 
        className='btn' 
        onClick={async () => {
            await logout();
            setUser(null);
            }}
            >
                Logout</button>
        )}
       </nav>
    );
}