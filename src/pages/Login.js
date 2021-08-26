import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import { logInUser } from "../api/Queries";

// Login component
const Login = () => {
  //useStates for form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");

  // initiate history
  const history = useHistory();

  // bring getUser function in from context
  const { getUser } = useContext(UserContext);

  // function to handle login click
  async function login(e) {
    e.preventDefault();
    const loginFormBody = { email: loginEmail, password: loginPassword };
    try {
      await logInUser(loginFormBody);
      await getUser();
      history.push("/admin");
    } catch (error) {
      console.log({ error });
      setError(error.response.data.errorMessage);
    }
  }

  return (
    <div className="container mx-auto">
      <h3 className="text-gray-800 font-medium text-2xl py-6">Login</h3>
      <form onSubmit={login}>
        <div className="flex flex-col">
          <label htmlFor="loginEmail">Email</label>
          <input
            id="loginEmail"
            type="email"
            className="rounded-md bg-gray-50 mt-1"
            onChange={(e) => setLoginEmail(e.target.value)}
          ></input>
        </div>
        <div className="flex flex-col">
          <label htmlFor="loginPassword">Password</label>
          <input
            id="loginPassword"
            type="password"
            className="rounded-md bg-gray-50 mt-1"
            onChange={(e) => setLoginPassword(e.target.value)}
          ></input>
        </div>
        <button
          type="submit"
          className="mt-6 bg-gray-500 text-white font-medium rounded-lg py-1 px-2 hover:bg-gray-600"
        >
          Login
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
