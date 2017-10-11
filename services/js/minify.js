const gulp = require('gulp');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

const jsMinify = function(callback) {
    gulp.src(global.enjin.root + global.enjin.js.dir + global.enjin.js.file)
        .pipe(plumber({
            errorHandler: function(error) {
                global.browserSync.notify(error.message, global.errorTimeout);
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest(global.enjin.root + global.enjin.js.dir))
        .on('end', function() {
            callback();
        });
};
jsMinify.displayName = 'Minifying js files to build.min.js';

module.exports = jsMinify;