const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const minifyCss = require('gulp-clean-css');

module.exports = function(gulp, callback) {
    if (appLocal) {
        console.log('Skipping css minification on local build...');
        callback();
        return false;
    }
    return gulp.src(cssDestDir+cssDestFile)
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
        .pipe(gulp.dest(cssDestDir));
};