const gulp = require('gulp');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const minifyCss = require('gulp-clean-css')

const cssMinify = function(callback) {
    gulp.src(global.enjin.root + global.enjin.css.dir + global.enjin.css.file)
        .pipe(plumber({
            errorHandler: function(error) {
                errored = true;
                if(global.isWatching && global.synced){
                    errorMessage.push(error.message.replace(/(?:\r\n|\r|\n)/g, '<br />'));
                }
                this.emit('end');
            }
        }))
        .pipe(minifyCss({keepSpecialComments : 0}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(global.enjin.root + global.enjin.css.dir))
        .on('end', function() {
            callback();
        });
};
cssMinify.displayName = 'Minifying CSS to build.min.css';


module.exports = cssMinify;