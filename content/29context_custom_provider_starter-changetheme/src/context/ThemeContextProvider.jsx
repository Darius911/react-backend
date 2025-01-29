import { useState } from "react";
import ThemeContext from "./ThemeContext";
function ThemeContextProvider({ children }) {

    const [myTheme, setMyTheme] = useState(() => localStorage.getItem("myTheme") || "light");

    if(myTheme){
        document.documentElement.className = myTheme
    }
    return (
<ThemeContext.Provider value={{myTheme, setMyTheme}}>
{children}
</ThemeContext.Provider>

    )
}

export default ThemeContextProvider;