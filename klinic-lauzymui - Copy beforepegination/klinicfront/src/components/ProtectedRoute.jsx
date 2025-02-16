import { useContext } from "react";
import UserContext from '../contexts/UserContext';
import { Navigate } from "react-router";

 const ProtectedRoute =({children}) =>  {
    const {user, loading} = useContext(UserContext);
   

    if (loading) {
        return <div>Loading...</div>;
    }
    
    return user ? children : <Navigate to="/" replace />
};

export default ProtectedRoute