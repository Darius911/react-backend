import { NavLink, useNavigate } from "react-router";
import UserContext from "../contexts/UserContext";
import { logout } from "../utils/logout";
import { useContext } from "react";

export default function Navigation() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <nav className="flex justify-center items-center h-16 bg-white text-black text-2xl">
      {user && (
        <>
          {/* Adminas gali matyti abu */}
          {user.role === "admin" && (
            <>
              <NavLink
                className="bg-blue-950 hover:bg-blue-700 font-bold py-2 px-4 rounded text-white text-sm"
                to="/myappointments"
              >
                My appointments
              </NavLink>
              <NavLink
                className="bg-blue-950 hover:bg-blue-700 font-bold py-2 px-4 rounded text-white text-sm"
                to="/appointments"
              >
                Appointments
              </NavLink>
            </>
          )}

          {/* Jei vartotojas nėra adminas, rodom tik "My appointments" */}
          {user.role !== "admin" && (
            <NavLink
              className="bg-blue-950 hover:bg-blue-700 font-bold py-2 px-4 rounded text-white text-sm"
              to="/myappointments"
            >
              My appointments
            </NavLink>
          )}
        </>
      )}

      {!user ? (
        <NavLink
          className="bg-blue-950 hover:bg-blue-700 font-bold py-2 px-4 rounded text-white text-sm"
          to="/"
        >
          Login
        </NavLink>
      ) : (
        <button
          className="bg-blue-950 hover:bg-blue-700 font-bold py-2 px-4 rounded text-white text-sm"
          onClick={async () => {
            await logout();
            setUser(null);
            navigate("/"); // Po atsijungimo į login
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
}
