import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";
import domain from "../util/domain";

// Signup component
const Signup = () => {
  // useStates for Form
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPasswordVerify, setSignupPasswordVerify] = useState("");
  const [signupError, setSignupError] = useState();

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
      await axios.post(`${domain}/auth/signup`, signupFormBody);
      await getUser();
      history.push("/");
    } catch (error) {
      setSignupError(error.response.data.errorMessage);
    }
  }

  return (
    <div>
      <h3>Signup</h3>
      <form onSubmit={signup}>
        <label htmlFor="signupEmail">Email</label>
        <input
          id="signupEmail"
          type="email"
          onChange={(e) => setSignupEmail(e.target.value)}
        ></input>
        <label htmlFor="signupPassword">Password</label>
        <input
          id="signupPassword"
          type="password"
          onChange={(e) => setSignupPassword(e.target.value)}
        ></input>
        <label htmlFor="signupPasswordVerify">Verify Password</label>
        <input
          id="signupPasswordVerify"
          type="password"
          onChange={(e) => setSignupPasswordVerify(e.target.value)}
        ></input>
        <button type="submit">Sign Up</button>
      </form>
      <div>{signupError}</div>
    </div>
  );
};

export default Signup;
