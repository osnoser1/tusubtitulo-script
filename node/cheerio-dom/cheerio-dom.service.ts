import { CheerioDomStatic } from './cheerio-dom-static.model';
import { DomStatic } from './../../core/dom';

var cheerio = require('cheerio') as CheerioAPI;

export class CheerioDomService {
    
    load = (html: string): CheerioDomStatic => cheerio.load(html);

}