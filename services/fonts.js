const gulp = require('gulp');


const fontsTask = function(callback) {
    gulp.src(global.enjin.font.copy)
        .pipe(gulp.dest(global.enjin.root + global.enjin.font.dir))
        .on('end', function() {
            if (callback && typeof callback === 'function') {
                callback();
            }
        });
};
fontsTask.displayName = `Copying fonts to ${global.enjin.root + global.enjin.font.dir}`;


module.exports = fontsTask;