const gulp = require('gulp');

const buildClean = require('../services/build/clean');
const syncStart = require('../services/sync');
const buildWatch = require('../services/build/watch');
const buildTasks = require('../services/buildTasks');

module.exports = gulp.series(
    buildClean, 
    gulp.parallel(...buildTasks()),
    gulp.parallel(syncStart, buildWatch)
);