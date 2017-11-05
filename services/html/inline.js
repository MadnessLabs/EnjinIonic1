const gulp = require('gulp');
const inlinesource = require('gulp-inline-source');

const htmlInline = function(callback) {
    gulp.src(global.enjin.root + global.enjin.html.file)
    .pipe(inlinesource())
    .pipe(gulp.dest(global.enjin.root))
    .on('end', function() {
        if (callback && typeof callback === 'function') {
            callback();
        }
    });
};
htmlInline.displayName = 'Inlining CSS and JS files';

module.exports = htmlInline;