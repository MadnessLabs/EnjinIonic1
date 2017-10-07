const gulp = require('gulp');

// BUILD COMMANDS
gulp.task('build', require('./services/build'));
gulp.task('build:clean', require('./services/build/clean'));
gulp.task('build:config', require('./services/build/config'));
gulp.task('build:css', require('./services/build/css'));
gulp.task('build:js', require('./services/build/js'));
gulp.task('build:watch', require('./services/build/watch'));

// CSS COMMANDS
gulp.task('css:compile', require('./services/css/compile'));
gulp.task('css:concat', require('./services/css/concat'));
gulp.task('css:config', require('./services/css/config'));
gulp.task('css:import', require('./services/css/import'));
gulp.task('css:libraries', require('./services/css/libraries'));
gulp.task('css:minify', require('./services/css/minify'));

gulp.task('default', require('./services/default'));

// GIT COMMANDS
gulp.task('git:reset', require('./services/git/reset'));

// HTML COMMANDS
gulp.task('html:compile', require('./services/html/compile'));

// JS COMMANDS
gulp.task('js:app', require('./services/js/app'));
gulp.task('js:compile', require('./services/js/compile'));
gulp.task('js:concat', require('./services/js/concat'));
gulp.task('js:config', require('./services/js/config'));
gulp.task('js:minify', require('./services/js/minify'));
gulp.task('js:router', require('./services/js/router'));

// STENCIL COMMANDS
gulp.task('stencil:build', require('./services/stencil/build'));
gulp.task('stencil:clean', require('./services/stencil/clean'));

gulp.task('sync:start', require('./services/sync/start'));