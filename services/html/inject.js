const gulp = require('gulp');
const inject = require('gulp-inject');

const htmlInject = function(callback) {
    var filesToInject = global.enjin.css.build.concat(global.enjin.js.build);
    var target = gulp.src(global.enjin.root + global.enjin.html.file);
    var sources = gulp.src(filesToInject, {read: false});
  
    target.pipe(inject(sources, {relative: true}))
      .pipe(gulp.dest(global.enjin.root)).on('end', function() {
        if(callback && typeof callback === 'function') {
            callback();
        }
    });
};
htmlInject.displayName = 'Injecting index.html with CSS and JS files';

module.exports = htmlInject;