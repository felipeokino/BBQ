import { API_URL } from '@/helpers/contants';
import axios, { AxiosInstance } from 'axios';
import { IHTTPClient } from './httpClient.interface';

export class AxiosClient implements IHTTPClient {
  private api:AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
    });
  }
  post(url: string, data: any): Promise<any> {
    return this.api.post(url, data)
  }
  put(url: string, data: any): Promise<any> {
    return this.api.put(url, data)
  }
  get<O>(url: string): Promise<O> {
    return this.api.get(url);
  }
  delete(url: string) {
    return this.api.delete(url)
  }
    
}