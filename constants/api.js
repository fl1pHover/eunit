import Axios from 'axios';

let urls = {
  test: `http://localhost:5050`,
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
