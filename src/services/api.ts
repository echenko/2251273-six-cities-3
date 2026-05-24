import axios, {AxiosInstance} from 'axios';
import { CONFIGURATION_API } from '../const';
import { getToken } from '../services/token';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: CONFIGURATION_API.BASE_URL,
    timeout: CONFIGURATION_API.TIME_OUT
  });

  api.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers['x-token'] = token;
      }
      return config;
    }
  );

  return api;
};
