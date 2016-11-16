import { CliArguments } from './cli-arguments';
import { Arguments, Commands } from './arguments';
var gulp = require('gulp');
var h2p = require('html2plaintext');
var gutil = require('gulp-util');
var request = require('request');
var cheerio = require('cheerio') as CheerioAPI;

var options = {
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Cookie': 'PHPSESSID=87dbf96cd689588ebbf72a65dbe0f654; subtitulosu=139062; subtitulosp=43e5c74b22dd9989e623c38c33873828a0a6e839'
    },
    url: ''
};

var cli = new CliArguments;

generar(cli[Commands.Id], cli[Commands.Lang]);

function getUri(id, lang, start) { return `http://www.tusubtitulo.com/translate_ajaxlist.php?id=${id}&fversion=0&langto=${lang}&langfrom=1&start=${start}` };
// return 'http://www.tusubtitulo.com/ajax_list.php?id=' + id + '&fversion=0&lang=' + lang + '&slang=1&updated=true&start=' + start + '&search=&user=0'

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

function _generate(id, lang, start, file) {
    options.url = getUri(id, lang, start);
    //console.log(options.url);
    request(options, function (error, response, body) {
        if (error || response.statusCode != 200) {
            // API call failed...
            console.log(error);
            return _generate(id, lang, start, file);
        }
        //console.log(body);
        let $ = cheerio.load(body);
        var array: {}[] = [];
        console.log("Página " + (start / 20 + 1));
        $("#tabla tr.lockedText, #tabla tr.quotedText, #tabla tr.originalText").each(function (index, value) {
            var values = $(value).find('td');
            var o = {
                Nro: $(values.get(0)).find('div').html(),
                Tiempos: h2p($(values.get(4)).html()),
                Texto: h2p($(values.get($(value).hasClass('originalText') ? 5 : 6)).html())
            };
            file += o.Nro + "\n" + o.Tiempos + "\n" + o.Texto + "\n\n";
            array.push(o);
            // console.log(o);  
        });
        if (!array.length) {
            string_src(id + ".srt", file).pipe(gulp.dest('build/'));
        } else {
            _generate(id, lang, start + 20, file);
        }
    });
}