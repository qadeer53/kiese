import axios from "axios";
const baseDomain = "https://email-provider-backend.herokuapp.com/api";

const baseURL = `${baseDomain}`;

export default axios.create({
  baseURL,
  headers: {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
  },
});
