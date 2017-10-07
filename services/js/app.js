const gulp = require('gulp');
const template = require('gulp-template');

const jsApp = function(callback) {
    gulp.src(global.enjin.tmplDir+'ts/app.ts')
        .pipe(template({
            app: global.enjin.name,
            plugins: JSON.stringify(global.enjin.plugins).slice(1,-1).replace(/"/g, "'").replace(/,/g, ", \n\t\t"),
            typings: '../typings/index.d.ts'
        }))
        .pipe(gulp.dest(global.enjin.js.srcDir))
        .on('end', function() {
            callback();
        });
};
jsApp.displayName = 'Creating angular app module';

module.exports = jsApp;