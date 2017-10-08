const gulp = require('gulp');


const buildWatch = function() {
    global.isWatching = true;
    gulp.watch(global.enjin.envFiles, require('../build'));
    gulp.watch(global.enjin.html.watch, require('../html/compile'));
    gulp.watch(global.enjin.css.watch, require('./css'));
    gulp.watch(global.enjin.js.watch, require('./js'));
    if (global.enjin.stenciljs) {
        gulp.watch(global.enjin.stenciljs.watch, require('../stencil'));
    }
};
buildWatch.displayName = 'Watching build for changes';

module.exports = buildWatch;