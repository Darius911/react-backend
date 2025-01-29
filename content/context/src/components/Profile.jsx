import ThemeContext from "../ThemeContext";
import UserContext from "../UserContext";
import { useContext } from "react";
import { FaMoon } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";

function Profile() {
  const { user } = useContext(UserContext);
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="profile">
      <p>User Profile {user.userName}</p>
      {theme !== "dark" ? (
        <FaMoon onClick={() => setTheme("dark")} />
      ) : (
        <IoMdSunny onClick={() => setTheme("light")} />
      )}
    </div>
  );
}

export default Profile;
