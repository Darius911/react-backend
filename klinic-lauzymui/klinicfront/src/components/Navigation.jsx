import { NavLink } from "react-router";
import UserContext from  "../contexts/UserContext"
import {logout} from "../utils/logout"
import {useContext} from 'react';

export default function Navigation() {
    const {user, setUser} = useContext(UserContext);
    return (
        <nav className="flex gap-4 flex-col w-[fit-content] h-[screen]">
          {user&&<NavLink className=" rounded-xl p-1" to="/appointments">
            appointments
        </NavLink>} 

        {!user?(
            <NavLink className=" rounded-xl p-1" to="/">
        Login
        </NavLink>
        ) : (
        

        <button 
        className=' rounded-xl p-1' 
        onClick={async () => {
            await logout();
            setUser(null);
            }}
            >
                Logout</button>
        )} 
        <NavLink className=" rounded-xl p-1" to="/myappointments">        
        My appointments</NavLink>
        </nav>
    );
} 