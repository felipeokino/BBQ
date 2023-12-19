export interface IHTTP {
  get<O>(url: string): Promise<O>;
  post(url: string, data: any): Promise<any>
  put(url: string, data: any): Promise<any>
  delete(url: string): Promise<any>
}