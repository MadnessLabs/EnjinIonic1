const gulp = require('gulp');

const buildClean = require('../services/build/clean');
const buildJs = require('../services/build/js');
const buildCss = require('../services/build/css');
const stencilBuild = require('../services/stencil/build');
const htmlCompile = require('../services/html/compile');
const setEnjinGlobal = require('../services/setEnjinGlobal');


module.exports = gulp.series(
    function(done) {
        setEnjinGlobal();
        global.reload = false;
        done();
    },  
    buildClean, 
    gulp.parallel(buildJs, stencilBuild, buildCss, htmlCompile),
    function(done) {
        if (global.synced) {
            console.log('Turning back on reload...');
            global.reload = true;
        }
        done();
    }
);