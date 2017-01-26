import { StringUtils } from './utils';
import { DomService } from './dom';
import { Linea } from './linea.model';
import { FileService } from './file.service';
import { HttpService } from './http/http.service';

/**
 * TuSubtituloApiService
 */
export class TuSubtituloApiService {

    private options = {
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Cookie': 'PHPSESSID=?; subtitulosu=?; subtitulosp=?'
        },
        url: ''
    };

    constructor(private dom: DomService, private http: HttpService, private stringUtils: StringUtils) { }

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
                Tiempos: this.stringUtils.htmlToPlainText($(values.get(4)).html()),
                Texto: this.stringUtils.htmlToPlainText($(values.get($(value).hasClass('originalText') ? 5 : 6)).html())
            };
        }).get();
    }

    private url = (id: number, lang: number, start: number) =>
        `http://www.tusubtitulo.com/translate_ajaxlist.php?id=${id}&fversion=0&langto=${lang}&langfrom=1&start=${start}`;

}