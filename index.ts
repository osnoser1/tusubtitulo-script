import { TuSubtituloApiService } from './core/tu-subtitulo-api.service';
import { CheerioDomService } from './node/cheerio-dom/cheerio-dom.service';
import { NodeHttpService, NodeFileService } from './node';
import { FileService } from './core/file.service';
import { CliArguments } from './cli-arguments';
import { Commands } from './arguments';

var cli = new CliArguments;
var fileService: FileService = new NodeFileService;

var api = new TuSubtituloApiService(new CheerioDomService, new NodeHttpService);

(async () => {
    const id = cli[Commands.Id];
    const lang = cli[Commands.Lang];

    const subtitle = await api.getSubtitulo(id, lang);
    const file = subtitle.reduce((prev, cur) => `${prev}${cur.Nro}\n${cur.Tiempos}\n${cur.Texto}\n\n`, '');

    fileService.saveText(file, `${id}.srt`, 'build/');
})();
