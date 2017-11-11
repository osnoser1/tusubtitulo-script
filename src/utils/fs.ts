import * as fs from 'fs';
import { dirname } from 'path';

export function readFile(fileName: string) {
    return new Promise<string>((resolve, reject) =>
        fs.readFile(fileName, 'utf-8', (err: any, data: string) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        }),
    );
}

export function writeFile(fileName: string, content: string, options?: any) {
    return new Promise<void>((resolve, reject) =>
        fs.writeFile(fileName, content, options, (err: any) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        }),
    );
}

export function deleteFile(path: string) {
    return new Promise<void>((resolve, reject) =>
        fs.unlink(path, err => {
        if (err) {
            reject(err);
        } else {
            resolve();
        }
        }),
    );
}

export function moveFile(from: string, to: string) {
    return new Promise<void>((resolve, reject) => fs.rename(from, to, err => {
        if (err) {
            reject(err);
        } else {
            resolve();
        }
    }));
}

export function symlinkFile(from: string, to: string, type?: string) {
    return new Promise<void>((resolve, reject) => fs.symlink(from, to, type, err => {
        if (err) {
            reject(err);
        } else {
            resolve();
        }
    }));
}

export function createDir(path: string) {
    return _recursiveMkDir(path);
}

function _recursiveMkDir(path: string): Promise<void> {
    return fs.existsSync(path)
        ? Promise.resolve()
        :  _recursiveMkDir(dirname(path)).then(() => fs.mkdirSync(path));
}

export function copyFile(from: string, to: string) {
    return _recursiveMkDir(dirname(to)).then(() => new Promise((resolve, reject) => {
        const rd = fs.createReadStream(from);
        rd.on('error', (err: Error) => reject(err));

        const wr = fs.createWriteStream(to);
        wr.on('error', (err: Error) => reject(err));
        wr.on('close', () => resolve());

        rd.pipe(wr);
    }));
}

export function appendToFile(filePath: string, text: string, options?: any) {
    return readFile(filePath).then((content: string) =>
        writeFile(filePath, content.concat(text), options),
    );
}

export function prependToFile(filePath: string, text: string, options?: any) {
    return readFile(filePath).then((content: string) =>
        writeFile(filePath, text.concat(content), options),
    );
}
