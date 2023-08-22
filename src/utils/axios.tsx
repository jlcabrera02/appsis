import axios from "axios";

const user = localStorage.getItem("user");
const token = user ? JSON.parse(user).token : null;

export const urlServer = "http://192.168.1.111:3000/";

const server = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
  baseURL: urlServer.concat("api/"),
});

export default server;
