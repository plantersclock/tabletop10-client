import React, { useContext } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";

// Navbar component
const Navbar = () => {
  // get context for user
  const { user, getUser } = useContext(UserContext);

  // initiate history
  const history = useHistory();

  // function to call logout endpoint
  async function logout() {
    try {
      await axios.get("http://localhost:5000/auth/logOut");
      await getUser();
      history.push("/");
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <nav>
      {user ? (
        <div onClick={logout} style={{ cursor: "pointer" }}>
          {user.email}
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
