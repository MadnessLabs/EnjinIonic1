const gulp = require('gulp');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const minifyCss = require('gulp-clean-css');
const stripCssComments = require('gulp-strip-css-comments');
const deleteLines = require('gulp-delete-lines');


const cssMinify = function (callback) {
    gulp.src(global.enjin.root + global.enjin.css.dir + global.enjin.css.file)
        .pipe(plumber({
            errorHandler: function (error) {
                errored = true;
                if (global.isWatching && global.synced) {
                    errorMessage.push(error.message.replace(/(?:\r\n|\r|\n)/g, '<br />'));
                }
                this.emit('end');
            }
        }))
        .pipe(stripCssComments({ preserve: false }))
        .pipe(deleteLines({
            'filters': [
                /@charset "[a-zA-Z0-9-]{1,}";/i
            ]
        }))
        .pipe(minifyCss({ specialComments: 0 }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(global.enjin.root + global.enjin.css.dir))
        .on('end', function () {
            callback();
        });
};
cssMinify.displayName = 'Minifying CSS to build.min.css';


module.exports = cssMinify;