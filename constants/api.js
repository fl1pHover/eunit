import Axios from 'axios';

let urls = {
<<<<<<< HEAD
  test: `https://bom-location.herokuapp.com`,

  // test: `http://localhost:5050`,
=======
  // test: `https://bom-location.herokuapp.com`,

  test: `http://localhost:5050`,
>>>>>>> af1da6b019e93ec5028c77d8b7ca82badc710e5c

  // test: `192.168.1.49:5050`,
  production: ``,
};

const api = Axios.create({
  baseURL: urls['test'],
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer `,
  },
});

export default urls;

const API_URL = 'https://bom-location.herokuapp.com';
// const PRODUCTION_URL = "https://api.metamori.mn";

export {
  API_URL,
  // PRODUCTION_URL
};
