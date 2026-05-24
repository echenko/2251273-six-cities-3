import axios, {AxiosInstance} from 'axios';

const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities';
const TIME_OUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
  });

  return api;
};
