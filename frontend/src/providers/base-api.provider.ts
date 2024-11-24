import axios, { AxiosInstance } from 'axios';

export default class BaseApiProvider {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl?: string) {
    const headers = {
      'Content-Type': 'application/json',
    };

    this.axiosInstance = axios.create({
      baseURL: baseUrl || 'http://backend:8080',
      headers,
    });
  }

  async http<TResponse, TData>(method: string, path: string, data: TData) {
    try {
      const response = await this.axiosInstance({
        method,
        url: path,
        data: data,
      });
      return response.data as TResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  get<TResponse>(path: string): Promise<TResponse> {
    return this.http<TResponse, undefined>('get', path, undefined);
  }

  post<TResponse, TData>(path: string, data: TData): Promise<TResponse> {
    return this.http<TResponse, TData>('post', path, data);
  }
}
