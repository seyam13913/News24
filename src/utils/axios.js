import axios from "axios";

const apiLink = axios.create({
  baseURL: process.env.REACT_APP_NEWS_URL,
});

apiLink.defaults.headers.common["X-Api-Key"] =
  process.env.REACT_APP_NEWS_API_KEY;

export default apiLink;
