import axios from "axios";

export const signup = async (user) => await axios.post(`/api/signup`, user);

export const login = async (user) => await axios.post(`/api/login`, user);

export const updateUserInLocalStorage = (user, next) => {
  if (window.localStorage.getItem("auth")) {
    let auth = JSON.parse(localStorage.getItem("auth"));
    auth.user = user;
    localStorage.setItem("auth", JSON.stringify(auth));
    next();
  }
};
