import axios, { AxiosError, AxiosResponse } from 'axios';
import * as API from './services';

export interface ResponseData<T = unknown, D = unknown> extends AxiosResponse<T, D> {
  error?: AxiosError['response'];
}

export const apiClient = axios.create({
  baseURL: '/api',
});

export default API;
