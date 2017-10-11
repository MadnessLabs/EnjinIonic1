const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

const jsConcat = function(callback) {
    var jsFiles = global.enjin.local ? global.enjin.js.build : global.enjin.js.libraries.concat(global.enjin.js.build);
    
    gulp.src(jsFiles)
        .pipe(sourcemaps.init())
        .pipe(concat(global.enjin.js.file))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(global.enjin.root + global.enjin.js.dir))
        .on('end', function() {
            callback();
        });    
};
jsConcat.displayName = 'Concatenating js files into build.js';

module.exports = jsConcat;