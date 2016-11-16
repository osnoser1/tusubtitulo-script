import { DomStatic } from './dom-static.model';
/**
 * DomService
 */
export interface DomService {
    
    load(html: string): DomStatic;

}