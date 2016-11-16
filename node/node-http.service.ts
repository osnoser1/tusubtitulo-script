import { HttpOptions } from './../core/http/http-options';
import { HttpService } from './../core/http/http.service';

var request = require('request');

export class NodeHttpService implements HttpService {

    request<T>(options: HttpOptions): Promise<T> {
        return new Promise((resolve, reject) => request(
            Object.assign({ headers: {}, method: 'GET' }, options),
            (error, response, body) => error || response.statusCode != 200 ? reject(error) : resolve(body))
        );
    }

}