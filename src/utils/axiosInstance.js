import axios from "axios";

const instance = axios.create({
  baseURL: "https://serverheliverse.onrender.com/",
});

export default instance;
