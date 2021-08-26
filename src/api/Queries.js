import axios from "axios";
import domain from "../util/domain";

axios.defaults.withCredentials = true;

// Auth APIs

export const logOutUser = async () => {
  return axios.get(domain + "/auth/logOut");
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

// Channel APIs
export const getAllChannels = async () => {
  return await axios.get(domain + "/channel");
};

export const createChannel = async (createChannelFormBody) => {
  return await axios.post(domain + "/channel/create", createChannelFormBody);
};

// Reviewer APIs
export const getAllReviewers = async () => {
  return await axios.get(domain + "/reviewer");
};

export const createReviewer = async (createReviewerFormBody) => {
  return await axios.post(domain + "/reviewer/create", createReviewerFormBody);
};

// Rating APIs
export const getAllRatings = async () => {
  return await axios.get(domain + "/rating");
};

export const createRating = async (createRatingFormBody) => {
  console.log("here");
  return await axios.post(domain + "/rating/create", createRatingFormBody);
};

// Rating Get
export const searchGameName = async (gameName) => {
  return await axios.get(domain + `/game/search/?name=${gameName}`);
};

// Rating Get
export const getGameInfo = async (gameIds) => {
  console.log(gameIds);
  return await axios.get(domain + `/game/?gameIds=${gameIds}`);
};
