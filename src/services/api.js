import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.18:3001",
  // baseURL: "https://fastfeetbackend-fj.herokuapp.com",
});

export default api;
