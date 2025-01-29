import { useContext } from "react";
import UserContext from "../UserContext";

function Login() {
  const { user, userHandler } = useContext(UserContext);

  return (
    <div className="login-form">
      <div>Login form</div>
      {!user ? (
        <button
          onClick={() => userHandler({ userName: "Guest", isAdmin: true })}
        >
          Login User
        </button>
      ) : (
        <button onClick={() => userHandler(null)}>Logout User</button>
      )}
    </div>
  );
}

export default Login;
