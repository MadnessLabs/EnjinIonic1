const gulp = require('gulp');


const buildWatch = function() {
    global.isWatching = true;
    gulp.watch(global.enjin.envFiles, require('../build'));
    if (global.enjin.html && global.enjin.html.watch) {
        gulp.watch(global.enjin.html.watch, require('./html'));
    }
    if (global.enjin.css && global.enjin.css.watch) {
        gulp.watch(global.enjin.css.watch, require('./css'));
    }
    if (global.enjin.js && global.enjin.js.watch) {
        gulp.watch(global.enjin.js.watch, require('./js'));
    }
    if (global.enjin.stenciljs && global.enjin.stenciljs.watch) {
        gulp.watch(global.enjin.stenciljs.watch, require('../stencil'));
    }
    if (global.enjin.img && global.enjin.img.watch) {
        gulp.watch(global.enjin.img.watch, require('../images'));
    }
    if (global.enjin.font && global.enjin.font.watch) {
        gulp.watch(global.enjin.font.watch, require('../fonts'));
    }
};
buildWatch.displayName = 'Watching build for changes';

module.exports = buildWatch;