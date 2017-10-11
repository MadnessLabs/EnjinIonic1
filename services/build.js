const gulp = require('gulp');

const buildClean = require('./build/clean');
const setEnjinGlobal = require('./setEnjinGlobal');
const buildTasks = require('./buildTasks');
const htmlInject = require('./html/inject');


module.exports = gulp.series(
    function(done) {
        if (global.synced) {
            global.browserSync.notify('Running build, please wait...');
        }
        setEnjinGlobal();
        global.reload = false;
        done();
    },  
    buildClean, 
    gulp.parallel(...buildTasks()),
    function(done) {
        if (global.synced) {
            console.log('Turning back on reload...');
            htmlInject(() => {
                global.reload = true;
            });
        }
        done();
    }
);