const gulp = require('gulp');
const cache = require('gulp-cached');

const images = require('../images');


const buildWatch = function() {
    global.isWatching = true;
    gulp.watch(global.enjin.envFiles, require('../build'));
    gulp.watch(global.enjin.html.watch, require('../html/compile'));
    gulp.watch(global.enjin.css.watch, require('./css'));
    gulp.watch(global.enjin.js.watch, require('./js'));
    if (global.enjin.stenciljs) {
        gulp.watch(global.enjin.stenciljs.watch, require('../stencil'));
    }
    if (global.enjin.img && global.enjin.img.watch) {
        gulp.watch(global.enjin.img.watch, images);
    }
};
buildWatch.displayName = 'Watching build for changes';

module.exports = buildWatch;