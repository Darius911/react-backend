import { useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL
import axios from "axios";
import { createContext , useState } from "react";


export const UserContext = createContext(null);//reiksme pagal nutylejima

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    //jai veiksmas use efekto baigtas
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
            const {data:response} = await axios.get(`${API_URL}/users/me`, {
                withCredentials: true
            }); 
            setUser(response.data);
            
            
            } catch (error) {
                
               setUser(null);
               console.log(error.response.data.message);
                
            } finally{
                setLoading(false);
            }
        };
        fetchUser();
    },[]);  

    return (
        //loading duoda zinoti kada baigtas veiksmas
        <UserContext.Provider value={{user, setUser, loading}}>
            {children}
        
        </UserContext.Provider>
    );
};