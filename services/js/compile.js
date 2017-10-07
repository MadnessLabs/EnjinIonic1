const gulp = require('gulp');
const cache = require('gulp-cached');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

const jsCompile = function(callback) {
    var endCount = 0;
    if (!global.tsProject) {
        console.log('Starting TypeScript compiler in Memory...');
        global.tsProject = ts.createProject({
            noUnusedParameters: false,
            "module": "system",
            "removeComments": true,
            "preserveConstEnums": true,
            "sourceMap": true
        });
    }
    var tsFiles = global.enjin.js.watch.slice(0, -2);
    var tsResult = gulp.src(tsFiles)
        .pipe(cache('jsCompile'))
        .pipe(sourcemaps.init())
        .pipe(global.tsProject())
        .js.pipe(sourcemaps.write()).pipe(gulp.dest(global.enjin.buildDir + global.enjin.js.dir)).on('end', function() {
            callback();
        });
};
jsCompile.displayName = 'Compiling js files';

module.exports = jsCompile;