import * as request from 'request';

export type HttpOptions = {
    form?: { [propName: string]: any },
    headers?: { [propName: string]: string },
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
};

export const fetch = (url: string, options: HttpOptions): Promise<string> =>
    new Promise((resolve, reject) => request(
        { headers: {}, method: 'GET', url, ...options},
        (error, response, body) => error || response.statusCode != 200 ? reject(error) : resolve(body)
    ));
