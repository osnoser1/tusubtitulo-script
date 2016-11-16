/**
 * FileService
 */
export interface FileService {
    saveText(file: string, name: string, dest: string): void;
}