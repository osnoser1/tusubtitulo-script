import { Dom, DomElement } from './../../core/dom';
import { CheerioDomElement } from './cheerio-dom-element.model';

export interface CheerioDom extends Dom, Cheerio {

	// constructor(private cheerio: Cheerio) {	}

    find(selector: string): CheerioDom;
    find(element: CheerioDom): CheerioDom;

    get(): CheerioDomElement[]; 
    get(index: number): CheerioDomElement;
    get(): string[];
    get<T>(): T[];
    get(index: number): DomElement;
    // get<T>(index?: number): DomElement | T[]{ 
    //     return index !== undefined ? this.cheerio.get(index) : <any[]>this.cheerio.get();
    // }
    // hasClass = (className: string): boolean => this.cheerio.hasClass(className);
    html(): string;// => this.cheerio.html();
    html(html: string): CheerioDom;
    map(func: (index: number, element: DomElement) => any): CheerioDom// => new CheerioDom(this.cheerio.map())
}