const gulp = require('gulp');

const jsApp = require('../js/app');
const jsConfig = require('../js/config');
const cssConfig = require('../css/config');

const configTasks = function() {
    var tasks = [];
    tasks.push(jsApp, jsConfig, cssConfig);
    return tasks;
};


module.exports = gulp.parallel(...configTasks());