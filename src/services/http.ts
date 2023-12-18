
import { IHTTPClient } from './clients/httpClient.interface';
import { IHTTP } from './http.interface';


export class HTTP implements IHTTP {
  constructor(private readonly httpClient:IHTTPClient){}
  async post(url: string, data: any): Promise<any> {
    return await this.httpClient.post(url, data);
  }
  async put(url: string, data: any): Promise<any> {
    return await this.httpClient.put(url, data);
  }
  async get<O>(url: string): Promise<O> {
    return await this.httpClient.get(url);
  }
  async delete<O>(url: string): Promise<O> {
    return await this.httpClient.delete(url);
  }
}