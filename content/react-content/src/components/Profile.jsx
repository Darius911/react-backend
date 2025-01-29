import ThemeContext from "../ThemeContext";
import { useContext } from "react";
import { FaRegMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";


function Profile() {
    const {theme, setTheme} = useContext(ThemeContext);

    const changeTheme = (theme) => {
      setTheme(theme);
    };

    // console.log(contextData);
    
    return (
     <div className="profile">
       <p>User Profile</p>
       <p>use theme {theme}</p>

        {theme!=='dark'? <FaRegMoon onClick={() => changeTheme("dark")}/> : 
            <MdSunny onClick={() => changeTheme("light")}/>}

      
        </div>
   );
 }
 
 export default Profile;