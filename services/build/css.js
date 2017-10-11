const gulp = require('gulp');

const cssConfig = require('../css/config');
const cssImport = require('../css/import');
const cssLibraries = require('../css/libraries');
const cssCompile = require('../css/compile');
const cssConcat = require('../css/concat');
const cssMinify = require('../css/minify');

const cssTasks = function() {
    var tasks = [gulp.parallel(cssConfig, cssImport), gulp.parallel(cssLibraries, cssCompile)];
    if (!global.enjin.local){ 
        tasks.push(cssConcat, cssMinify);
    }
    return tasks;
};


module.exports = gulp.series(...cssTasks());
