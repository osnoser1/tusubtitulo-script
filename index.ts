import { CheerioDomService } from './node/cheerio-dom/cheerio-dom.service';
import { DomService } from './core/dom';
import { NodeHttpService, NodeFileService } from './node';
import { HttpService } from './core/http/http.service';
import { FileService } from './core/file.service';
import { CliArguments } from './cli-arguments';
import { Arguments, Commands } from './arguments';

var h2p = require('html2plaintext');

interface Linea { Nro: string, Tiempos: string, Texto: string }

var options = {
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Cookie': 'PHPSESSID=87dbf96cd689588ebbf72a65dbe0f654; subtitulosu=139062; subtitulosp=43e5c74b22dd9989e623c38c33873828a0a6e839'
    },
    url: ''
};

var cli = new CliArguments;
var fileService: FileService = new NodeFileService;
var http: HttpService = new NodeHttpService;
var dom: DomService = new CheerioDomService;

generate(cli[Commands.Id], cli[Commands.Lang]);

function getUri(id, lang, start) { return `http://www.tusubtitulo.com/translate_ajaxlist.php?id=${id}&fversion=0&langto=${lang}&langfrom=1&start=${start}` }

async function generate(id, lang) {
    let start = 0, file = '';
    while (true) {
        options.url = getUri(id, lang, start);
        try {
            const body = await http.request<string>(options);
            console.log(`Página ${start / 20 + 1}`);
            const array = getLineas(body);
            if (!array.length) {
                fileService.saveText(file, `${id}.srt`, 'build/');
                break;
            } else {
                file += array.reduce((prev, cur) => `${prev}${cur.Nro}\n${cur.Tiempos}\n${cur.Texto}\n\n`, '');
                start += 20;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

function getLineas(body: string): Linea[] {
    let $ = dom.load(body);
    return <any[]>$('#tabla tr.lockedText, #tabla tr.quotedText, #tabla tr.originalText').map((index, value) => {
        const values = $(value).find('td');
        return {
            Nro: $(values.get(0)).find('div').html(),
            Tiempos: h2p($(values.get(4)).html()),
            Texto: h2p($(values.get($(value).hasClass('originalText') ? 5 : 6)).html())
        };
    }).get();
}
