import axios from "axios";

export const signup = async (user) => await axios.post(`/signup`, user);

export const login = async (user) => await axios.post(`/login`, user);
