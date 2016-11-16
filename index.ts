import { CliArguments } from './cli-arguments';
import { Arguments, Commands } from './arguments';
var gulp = require('gulp');
var h2p = require('html2plaintext');
var gutil = require('gulp-util');
var request = require('request');
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

generar(cli[Commands.Id], cli[Commands.Lang]);

function getUri(id, lang, start) { return `http://www.tusubtitulo.com/translate_ajaxlist.php?id=${id}&fversion=0&langto=${lang}&langfrom=1&start=${start}` }

function generar(id, lang) {
    _generate(id, lang, 0, "");
}

function string_src(filename, string) {
    var src = require('stream').Readable({ objectMode: true })
    src._read = function () {
        this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }));
        this.push(null);
    }
    return src;
}

async function _generate(id, lang, start, file) {
    options.url = getUri(id, lang, start);
    try {
        let body = await httpRequest<string>(options);
        console.log(`Página ${start / 20 + 1}`);
        var array: Linea[] = getLineas(body);
        if (!array.length) {
            save(file, `${id}.srt`, 'build/');
        } else {
            file += array.map(o => `${o.Nro}\n${o.Tiempos}\n${o.Texto}\n\n`).join('');
            _generate(id, lang, start + 20, file);
        }
    } catch(error) {
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

function save(file: any, name: string, dest: string): void {
    string_src(name, file).pipe(gulp.dest(dest));
}

function httpRequest<T>(options: any): Promise<T> {
    return new Promise((resolve, reject) => 
        request(options, (error, response, body) => {
            if (error || response.statusCode != 200) return reject(error);
            resolve(body);
        })
    );
}