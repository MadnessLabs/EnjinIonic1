const gulp = require('gulp');

const buildClean = require('../services/build/clean');
const syncStart = require('../services/sync');
const buildWatch = require('../services/build/watch');
const buildTasks = require('../services/buildTasks');
const htmlInject = require('../services/html/inject');

const defaultTasks = function() {
    var tasks = [gulp.series(buildClean, gulp.parallel(...buildTasks()))];
    if (global.enjin.local) {
        tasks.push(htmlInject, gulp.parallel(syncStart, buildWatch));
    };
    return tasks;
};


module.exports = gulp.series(...defaultTasks());