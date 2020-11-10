const gulp = require('gulp');
const cache = require('gulp-cached');

const imagesTask = function(callback) {
    gulp.src(`${global.enjin.img.srcDir}*.{png,jpg}`)
        .pipe(cache('images'))
        .pipe(gulp.dest(global.enjin.root + global.enjin.img.dir))
        .on('end', function() {
            if (global.synced && global.reload) {
                global.browserSync.reload();
            }
            if (callback && typeof callback === 'function') {
                callback();
            }
        });
};
imagesTask.displayName = 'Resizing images for project';

module.exports = imagesTask;