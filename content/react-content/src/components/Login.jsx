import UserContext from "../UserContext";
import { useContext } from "react";

function Login() {
  const [user, setUser] = useContext(UserContext);

  const changeUser = (user) => {
    setUser(user);
  };


  return (
    <div className="login-form">
      <div>Login form</div>
      <p>user : {user.name + " " + user.role}</p>

      {user.name === "Pavardenis" ? (
        <p onClick={() => changeUser({ name: "Vardenis", role: "admin" })}>{user.name + " " + user.role}</p>
      ) : (
        <p onClick={() => changeUser({ name: "Pavardenis", role: "user" })}>{user.name + " " + user.role}</p>
      )}
    </div>
  );
}

export default Login;
