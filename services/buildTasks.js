const gulp = require('gulp');

const buildClean = require('./build/clean');
const syncStart = require('./sync');
const buildWatch = require('./build/watch');
const htmlInject = require('./html/inject');
const jsTasks = require('./js/tasks');
const cssTasks = require('./css/tasks');
const stencilBuild = require('./stencil');
const htmlCompile = require('./html/compile');
const images = require('./images');
const fonts = require('./fonts');


module.exports = function() {
    var tasks = [
        buildClean, 
        gulp.parallel(
            gulp.series(...jsTasks()), 
            gulp.series(...cssTasks()), 
            htmlCompile
        )
    ];
    
    if (global.enjin.stenciljs) {
        tasks.push(stencilBuild);
    }
    if (global.enjin.img) {
        tasks.push(images);
    }
    if (global.enjin.font) {
        tasks.push(fonts);
    }
    if (global.enjin.local) {
        tasks.push(htmlInject);
        tasks.push(gulp.parallel(syncStart, buildWatch));
    }
    
    return tasks;
};