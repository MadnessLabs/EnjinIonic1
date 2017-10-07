const gulp = require('gulp');
const sass = require('gulp-sass');

const cssLibraries = function(callback) {
    gulp.src(global.enjin.css.srcDir+'libraries.scss')
        .pipe(sass())
        .pipe(gulp.dest(global.enjin.buildDir + global.enjin.css.dir))
        .on('end', function() {
            callback();
        });
};
cssLibraries.displayName = 'Compiling CSS Libraries...';

module.exports = cssLibraries;