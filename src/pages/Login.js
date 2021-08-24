import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";

// Login component
const Login = () => {
  //useStates for form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // initiate history
  const history = useHistory();

  // bring getUser function in from context
  const { getUser } = useContext(UserContext);

  // function to handle login click
  async function login(e) {
    e.preventDefault();
    const loginFormBody = { email: loginEmail, password: loginPassword };
    try {
      await axios.post("http://localhost:5000/auth/login", loginFormBody);
      await getUser();
      history.push("/");
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={login}>
        <label htmlFor="loginEmail">Email</label>
        <input
          id="loginEmail"
          type="email"
          onChange={(e) => setLoginEmail(e.target.value)}
        ></input>
        <label htmlFor="loginPassword">Password</label>
        <input
          id="loginPassword"
          type="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
