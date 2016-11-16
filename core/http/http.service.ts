import { HttpOptions } from './http-options';
/**
 * HttpService
 */
export interface HttpService {

    request<T>(options: HttpOptions): Promise<T>;

}