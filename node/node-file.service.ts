import { FileService } from './../core/file.service';
var gulp = require('gulp');
var gutil = require('gulp-util');

/**
 * NodeFileService
 */
export class NodeFileService implements FileService {

    saveText(file: string, name: string, dest: string): void {
        this.string_src(name, file).pipe(gulp.dest(dest));
    }

    private string_src(filename, string) {
        var src = require('stream').Readable({ objectMode: true })
        src._read = function () {
            this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }));
            this.push(null);
        }
        return src;
    }

}