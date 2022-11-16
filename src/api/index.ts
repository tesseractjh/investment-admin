import isServer from '@utils/isServer';
import axios, { AxiosError, AxiosResponse } from 'axios';
import * as API from './services';

export interface ResponseData<T = unknown, D = unknown> extends AxiosResponse<T, D> {
  error?: AxiosError['response'];
}

export const clientAPI = axios.create({
  baseURL: '/api',
});

export const serverAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

serverAPI.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => ({ error: error.response })
);

export const getAPI = () => (isServer() ? serverAPI : clientAPI);

export default API;
