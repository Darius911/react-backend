import { useContext } from "react";
import UserContext from "../UserContext";

function Login() {
  const userContext = useContext(UserContext); // Pasiimame kontekstą
  const { user, setUser } = userContext; // Išskaidome reikšmes

  const changeUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <div className="login-form">
      <div>Prisijungimo forma</div>
      <p>Vartotojas: {user.name + " (" + user.role + ")"}</p>

      <p 
        onClick={() =>
          changeUser(
            user.name === "Pavardenis"
              ? { name: "Vardenis", role: "admin" }
              : { name: "Pavardenis", role: "user" }
          )
        }
        style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
      >
        Keisti vartotoją
      </p>
    </div>
  );
}

export default Login;
