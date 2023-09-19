import axios from "axios";

const user = localStorage.getItem("user");
export const token = user ? JSON.parse(user).token : null;

// export const urlServer = "https://appsisserver.fly.dev/";
export const urlServer = "http://localhost:3000/";

const server = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
  validateStatus: function (status) {
    if (status === 403) {
      localStorage.removeItem("user");
      window.location.href = "/login";
      console.log("asd");
    }

    return status >= 200 && status < 300; // default
  },
  baseURL: urlServer.concat("api/"),
});

export default server;
