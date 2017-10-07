const gulp = require('gulp');

const buildClean = require('../services/build/clean');
const buildJs = require('../services/build/js');
const buildCss = require('../services/build/css');
const stencilBuild = require('../services/stencil/build');
const htmlCompile = require('../services/html/compile');
const syncStart = require('../services/sync/start');
const buildWatch = require('../services/build/watch');

global.errorTimeout = 5000;

module.exports = gulp.series(
    buildClean, 
    gulp.parallel(buildJs, buildCss, stencilBuild, htmlCompile),
    gulp.parallel(syncStart, buildWatch)
);