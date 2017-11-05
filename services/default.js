const gulp = require('gulp');

const buildTasks = require('./buildTasks');


module.exports = gulp.series(...buildTasks());