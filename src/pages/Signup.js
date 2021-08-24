import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import { signUpUser } from "../api/Queries";

// Signup component
const Signup = () => {
  // useStates for Form
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPasswordVerify, setSignupPasswordVerify] = useState("");
  const [error, setError] = useState();

  // initiate useContext
  const { getUser } = useContext(UserContext);
  // initiate history
  const history = useHistory();

  // function to handle Sign Up click
  async function signup(e) {
    e.preventDefault();
    const signupFormBody = {
      email: signupEmail,
      password: signupPassword,
      passwordVerify: signupPasswordVerify,
    };

    // if signup is successful reset loggedInUser and redirect to home, else set state of error
    try {
      await signUpUser(signupFormBody);
      await getUser();
      history.push("/");
    } catch (error) {
      setError(error.response.data.errorMessage);
    }
  }

  return (
    <div className="container mx-auto">
      <h3 className="text-gray-800 font-medium text-2xl py-6">Signup</h3>
      <form onSubmit={signup}>
        <div className="flex flex-col">
          <label htmlFor="signupEmail">Email</label>
          <input
            id="signupEmail"
            type="email"
            className="rounded-md bg-gray-50 mt-1"
            onChange={(e) => setSignupEmail(e.target.value)}
          ></input>
        </div>
        <div className="flex flex-col">
          <label htmlFor="signupPassword">Password</label>
          <input
            id="signupPassword"
            type="password"
            className="rounded-md bg-gray-50 mt-1"
            onChange={(e) => setSignupPassword(e.target.value)}
          ></input>
        </div>
        <div className="flex flex-col">
          <label htmlFor="signupPasswordVerify">Verify Password</label>
          <input
            id="signupPasswordVerify"
            type="password"
            className="rounded-md bg-gray-50 mt-1"
            onChange={(e) => setSignupPasswordVerify(e.target.value)}
          ></input>
        </div>
        <button
          className="mt-6 bg-gray-500 text-white font-medium rounded-lg py-1 px-2 hover:bg-gray-600"
          type="submit"
        >
          Sign Up
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default Signup;
