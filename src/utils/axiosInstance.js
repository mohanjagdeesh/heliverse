import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:7015",
});

export default instance;
