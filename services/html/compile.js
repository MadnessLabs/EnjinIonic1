const gulp = require('gulp');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const cache = require('gulp-cached');

const htmlInject = require('./inject');

const htmlCompile = function (callback) {
    var ext = global.enjin.html.srcFile.split('.').pop();
    gulp.src(global.enjin.html.watch)
        .pipe(cache('htmlCompile'))
        .pipe(plumber({
            errorHandler: function (error) {
                if (global.isWatching && global.synced) {
                    console.log(error.message);
                    this.emit('end');
                }
            }
        }))
        .pipe(pug({
            locals: global.enjin,
            pretty: true
        }))
        .pipe(rename(function (file) {
            if (file.basename + '.' + ext === global.enjin.html.srcFile) {
                file.basename = 'index';
                file.dirname = '../';
            }
        }))
        .pipe(gulp.dest(global.enjin.root + global.enjin.html.dir))
        .on('end', function () {
            if (callback && typeof callback === 'function') {
                callback();
            }
        });
};
htmlCompile.displayName = 'Compiling html files';

module.exports = htmlCompile;