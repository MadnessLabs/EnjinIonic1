const gulp = require('gulp');
const jSass = require('gulp-json-sass');
const intercept = require('gulp-intercept');
const rename = require('gulp-rename');

const cssConfig = function(callback) {
    gulp.src(global.enjin.path)
        .pipe(intercept(function(file) {
            file.contents = new Buffer(JSON.stringify(global.enjin.css.vars));
            return file;
        }))
        .pipe(jSass({
            sass: false
        }))
        .pipe(rename('_variables.scss'))
        .pipe(gulp.dest(global.enjin.css.srcDir))
        .on('end', function() {
            callback();
        });
};
cssConfig.displayName = 'Setting CSS variables from enjin.json';

module.exports = cssConfig;