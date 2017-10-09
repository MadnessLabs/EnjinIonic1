const gulp = require('gulp');

const buildClean = require('../services/build/clean');
const setEnjinGlobal = require('../services/setEnjinGlobal');
const buildTasks = require('../services/buildTasks');


module.exports = gulp.series(
    function(done) {
        setEnjinGlobal();
        global.reload = false;
        done();
    },  
    buildClean, 
    gulp.parallel(...buildTasks()),
    function(done) {
        if (global.synced) {
            console.log('Turning back on reload...');
            global.reload = true;
        }
        done();
    }
);