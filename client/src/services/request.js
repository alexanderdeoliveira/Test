import axios from 'axios';
import { getToken } from './auth';

const request = axios.create({ baseURL: 'http://127.0.0.1:5000' });

request.interceptors.request.use(async config => {
  const token = getToken();

  if (token) {
    config.headers.token = token;
  }

  return config;
});

export default request;