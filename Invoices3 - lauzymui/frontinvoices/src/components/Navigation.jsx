import { NavLink } from "react-router";
import UserContext from  "../contexts/UserContext"
import {logout} from "../utils/logout"
import {useContext} from 'react';

export default function Navigation() {
    const {user, setUser} = useContext(UserContext);
    return (
        <nav className="flex gap-4 flex-col w-[fit-content] h-[screen]">
          {user&&<NavLink className="text-white bg-amber-700 rounded-xl p-1" to="/">
        Invoices
        </NavLink>} 

        {!user?(
            <NavLink className="text-white bg-amber-700 rounded-xl p-1" to="/login">
        Login
        </NavLink>
        ) : (
        

        <button 
        className='text-white bg-amber-700 rounded-xl p-1' 
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