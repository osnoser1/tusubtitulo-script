import { Dom, DomElement } from './../../core/dom';
import { CheerioDomElement } from './cheerio-dom-element.model';

export interface CheerioDom extends Dom, Cheerio {
    find(selector: string): CheerioDom;
    find(element: CheerioDom): CheerioDom;
    get(): CheerioDomElement[]; 
    get(index: number): CheerioDomElement;
    get(): string[];
    get<T>(): T[];
    get(index: number): DomElement;
    html(): string;
    html(html: string): CheerioDom;
    map(func: (index: number, element: DomElement) => any): CheerioDom
}