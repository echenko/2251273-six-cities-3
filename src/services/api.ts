import axios, {AxiosInstance} from 'axios';
import { CONFIGURATION_API } from '../const';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: CONFIGURATION_API.BASE_URL,
    timeout: CONFIGURATION_API.TIME_OUT
  });

  return api;
};
