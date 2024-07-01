// axios-instance/index.js

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8090", // Replace with your backend URL
  timeout: 10000, // Adjust timeout as needed
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
