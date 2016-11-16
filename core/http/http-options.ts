export interface HttpOptions { 
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: {[propName: string]: string} 
}
