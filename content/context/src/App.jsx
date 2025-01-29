import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { useState } from "react";
import UserContext from "./UserContext";
import ThemeContext from "./ThemeContext";

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");

  const userHandler = (user) => {
    setUser(user);
  };

  return (
    // 2. Provide value to the child components
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <UserContext.Provider value={{ user, userHandler }}>
        <div>
          <Login />
          {user && <Dashboard />}
        </div>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
