const gulp = require('gulp');

const jsCopy = function (callback) {
    if (!global.enjin.js.copy) {
        callback();
        return false;
    }
    gulp.src(global.enjin.js.copy, { base: global.enjin.buildDir })
        .pipe(gulp.dest(global.enjin.root))
        .on('end', function () {
            callback();
        });
};
jsCopy.displayName = `Copying JS files to ${global.enjin.root}${global.enjin.js.dir}`;

module.exports = jsCopy;