import axios, {AxiosInstance} from 'axios';
import { CONFIGURATION_API } from '../const';
import { getToken } from '../services/token';
import { getUserEmail } from '../services/user-email';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: CONFIGURATION_API.BASE_URL,
    timeout: CONFIGURATION_API.TIME_OUT
  });

  api.interceptors.request.use(
    (config) => {
      const token = getToken();
      const email = getUserEmail();
      if (token && email) {
        config.headers['x-token'] = token;
        config.headers['x-email'] = email;
      }
      return config;
    }
  );

  return api;
};
