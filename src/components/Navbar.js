import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { logOutUser } from "../api/Queries";

// Navbar component
const Navbar = () => {
  // get context for user
  const { user, getUser } = useAuth();

  // initiate history
  const history = useHistory();

  // function to call logout endpoint
  async function logout() {
    try {
      await logOutUser();
      await getUser();
      history.push("/");
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <nav className="py-5 flex justify-end bg-gray-700">
      {user ? (
        <>
          <div
            className="text-white mx-5"
            onClick={logout}
            style={{ cursor: "pointer" }}
          >
            <span className="hover:text-gray-200">{user.email}</span>
          </div>
          <Link to="/">HOME</Link>
        </>
      ) : (
        <div className="text-white space-x-5 mx-5">
          <Link to="/login">
            <span className="hover:text-gray-200">Login</span>
          </Link>
          <Link to="/signup">
            <span className="hover:text-gray-200">Sign up</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
