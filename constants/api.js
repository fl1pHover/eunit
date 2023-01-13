import Axios from "axios";

let urls = {
  test: `https://bom-location.herokuapp.com`,
  production: ``,
};

const api = Axios.create({
  baseURL: urls["test"],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer `,
  },
});

export default urls;

const API_URL = "https://bom-location.herokuapp.com";
// const PRODUCTION_URL = "https://api.metamori.mn";

export {
  API_URL,
  // PRODUCTION_URL
};
