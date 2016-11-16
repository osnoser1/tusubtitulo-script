import { Dom } from './dom.model';
export interface DomStatic {
    (selector: string): Dom;
    (selector: any): Dom;
}