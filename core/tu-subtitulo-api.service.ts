import { DomService } from './dom';
import { Linea } from './linea.model';
import { FileService } from './file.service';
import { HttpService } from './http/http.service';

var h2p = require('html2plaintext');

/**
 * TuSubtituloApiService
 */
export class TuSubtituloApiService {

    private options = {
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Cookie': 'PHPSESSID=87dbf96cd689588ebbf72a65dbe0f654; subtitulosu=139062; subtitulosp=43e5c74b22dd9989e623c38c33873828a0a6e839'
        },
        url: ''
    };

    constructor(private dom: DomService, private http: HttpService) { }

    getSubtitulo(id: number, lang: number): Promise<Linea[]> {
        return new Promise(async (resolve, reject) => {
            let start = 0, file = '', lineas: Linea[] = [];
            while (true) {
                this.options.url = this.url(id, lang, start);
                try {
                    const body = await this.http.request<string>(this.options);
                    const array = this.getLineas(body);
                    if (!array.length) {
                        break;
                    }
                    console.log(`Página ${start / 20 + 1}`);
                    lineas = lineas.concat(array);
                    start += array.length;
                } catch (error) {
                    console.log(error);
                }
            }
            resolve(lineas);
        });
    }

    private getLineas(body: string): Linea[] {
        let $ = this.dom.load(body);
        return <any[]>$('#tabla tr.lockedText, #tabla tr.quotedText, #tabla tr.originalText').map((index, value) => {
            const values = $(value).find('td');
            return {
                Nro: $(values.get(0)).find('div').html(),
                Tiempos: h2p($(values.get(4)).html()),
                Texto: h2p($(values.get($(value).hasClass('originalText') ? 5 : 6)).html())
            };
        }).get();
    }

    private url = (id: number, lang: number, start: number) =>
        `http://www.tusubtitulo.com/translate_ajaxlist.php?id=${id}&fversion=0&langto=${lang}&langfrom=1&start=${start}`;

}