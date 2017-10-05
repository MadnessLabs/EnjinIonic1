const clean = require('gulp-clean');


module.exports = function(gulp, callback) {
    return gulp.src([appBuild, 'www/build', stenciljsConfig.distDir], {read: false})
        .pipe(clean({force: true}));
};