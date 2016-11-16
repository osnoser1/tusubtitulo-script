import { NodeHttpService } from './node/node-http.service';
import { HttpService } from './core/http/http.service';
import { NodeFileService } from './node/node-file.service';
import { FileService } from './core/file.service';
import { CliArguments } from './cli-arguments';
import { Arguments, Commands } from './arguments';

var h2p = require('html2plaintext');
var cheerio = require('cheerio') as CheerioAPI;

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

generar(cli[Commands.Id], cli[Commands.Lang]);

function getUri(id, lang, start) { return `http://www.tusubtitulo.com/translate_ajaxlist.php?id=${id}&fversion=0&langto=${lang}&langfrom=1&start=${start}` }

function generar(id, lang) {
    _generate(id, lang, 0, "");
}

async function _generate(id, lang, start, file) {
    options.url = getUri(id, lang, start);
    try {
        let body = await http.request<string>(options);
        console.log(`Página ${start / 20 + 1}`);
        var array: Linea[] = getLineas(body);
        if (!array.length) {
            fileService.saveText(file, `${id}.srt`, 'build/');
        } else {
            file += array.reduce((prev, cur) => `${prev}${cur.Nro}\n${cur.Tiempos}\n${cur.Texto}\n\n`, '');
            _generate(id, lang, start + 20, file);
        }
    } catch (error) {
        console.log(error);
        _generate(id, lang, start, file);
    }
}

function getLineas(body: string): Linea[] {
    let $ = cheerio.load(body);
    return <any[]>$('#tabla tr.lockedText, #tabla tr.quotedText, #tabla tr.originalText').map((index, value) => {
        const values = $(value).find('td');
        return {
            Nro: $(values.get(0)).find('div').html(),
            Tiempos: h2p($(values.get(4)).html()),
            Texto: h2p($(values.get($(value).hasClass('originalText') ? 5 : 6)).html())
        };
    }).get();
}
