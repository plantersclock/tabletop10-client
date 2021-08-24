import axios from "axios";
import domain from "../util/domain";

axios.defaults.withCredentials = true;

const PATH = domain;

export const logOutUser = async () => {
  return axios.get(PATH + "/auth/logOut");
};

export const getLoggedInUser = async () => {
  return axios.get(domain + "/auth/loggedIn");
};

export const logInUser = async (loginFormBody) => {
  return axios.post(domain + "/auth/login", loginFormBody);
};

export const signUpUser = async (signupFormBody) => {
  return axios.post(domain + "/auth/signup", signupFormBody);
};
