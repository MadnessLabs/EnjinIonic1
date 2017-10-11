const gulp = require('gulp');

const buildClean = require('./build/clean');
const syncStart = require('./sync');
const buildWatch = require('./build/watch');
const buildTasks = require('./buildTasks');
const htmlInject = require('./html/inject');

const defaultTasks = function() {
    var tasks = [gulp.series(buildClean, gulp.parallel(...buildTasks()))];
    if (global.enjin.local) {
        tasks.push(htmlInject);
    }
    tasks.push(gulp.parallel(syncStart, buildWatch));
    return tasks;
};


module.exports = gulp.series(...defaultTasks());