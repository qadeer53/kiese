import axios from "axios";
const baseDomain = "https://api-dev.kbdp.kiesetechnologies.com:3001/api";

const baseURL = `${baseDomain}`;

export default axios.create({
  baseURL,
  headers: {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
  },
});
