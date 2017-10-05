const clean = require('gulp-clean');


module.exports = function(gulp, callback) {
    console.log(watcher);
    if (watcher) {
        watcher.pause('stenciljs');
    }
    return gulp.src([stenciljsConfig.distDir], {read: false})
        .pipe(clean({force: true}));
};