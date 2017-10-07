const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const cache = require('gulp-cached');

const cssCompile = function(callback) {
    gulp.src(global.enjin.css.watch)
        .pipe(cache('cssCompile'))
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                global.browserSync.notify(error.message, global.errorTimeout);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(global.enjin.buildDir + global.enjin.css.dir))
        .on('end', function() {
            callback();
        });
};
cssCompile.displayName = 'Compiling App CSS';

module.exports = cssCompile;