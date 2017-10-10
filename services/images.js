const gulp = require('gulp');
const responsive = require('gulp-responsive');
const responsiveConfig = require('gulp-responsive-config');
const cache = require('gulp-cached');

const imagesTask = function(callback) {
    var config = global.enjin.img.config || typeof global.enjin.img.config === 'object' ? global.enjin.img.config : responsiveConfig([
        `${global.enjin.root}**/*.css`,
        `${global.enjin.root}**/*.html`
    ]);

    gulp.src(`${global.enjin.img.srcDir}*.{png,jpg}`)
        .pipe(cache('images'))
        .pipe(responsive(config, global.enjin.img.options ? global.enjin.img.options : {
            errorOnUnusedConfig: false,
            errorOnEnlargement: false,
            errorOnUnusedImage: false,
            withMetadata: false,
            max: true,
        }))
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