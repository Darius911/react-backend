import Profile from "./Profile";
import ThemeContext from "../ThemeContext";
import { useContext } from "react";

function Dashboard() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`dashboard ${theme}`}>
      <div>
        <p>Admin Dash Board</p>
        <div>Users theme is {theme}</div>
      </div>

      <Profile />
    </div>
  );
}

export default Dashboard;
