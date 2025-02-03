import { useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL
import axios from "axios";
import { createContext , useState } from "react";


export const UserContext = createContext(null);//reiksme pagal nutylejima

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
            const {data:response} = await axios.get(`${API_URL}/users/me`, {
                withCredentials: true
            }); 
            setUser(response.data);
            
            
            } catch (error) {
               console.log(error);
                
            }
        };
        fetchUser();
    },[]);  

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        
        </UserContext.Provider>
    );
};