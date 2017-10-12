const gulp = require('gulp');

const jsApp = require('../js/app');
const jsConfig = require('../js/config');
const jsCompile = require('../js/compile');
const jsConcat = require('../js/concat');
const jsMinify = require('../js/minify');


const jsTasks = function() {
    var tasks = [jsApp, gulp.parallel(jsConfig, jsCompile)];
    if (!global.enjin.local) {
        tasks.push(jsConcat, jsMinify);
    } else {
        tasks.push(function(done) {
            if (global.reload) {
                global.browserSync.reload();
            }
            done();
        });
    }
    return tasks;
};


module.exports = gulp.series(...jsTasks());