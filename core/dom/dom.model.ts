import { DomElement } from './dom-element.model';
/**
 * Dom
 */
export interface Dom {
    find(selector: string): Dom;
    get<T>(): T[];
    get(index: number): DomElement;
    hasClass(className: string): boolean;
    html(): string;
    map(func: (index: number, element: DomElement) => any): Dom;
}