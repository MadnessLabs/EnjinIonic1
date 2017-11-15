const gulp = require('gulp');
const del = require('del');

const buildClean = require('./build/clean');
const buildTasks = require('./buildTasks');
const deploySsh = require('./deploy/ssh');
const workbox = require('./workbox');
const htmlInline = require('./html/inline');


module.exports = gulp.series(
    ...buildTasks(),
    function (done) {
        setTimeout(() => {
            var cssBuildPath = global.enjin.root + global.enjin.css.dir + global.enjin.css.file;
            var jsBuildPath = global.enjin.root + global.enjin.js.dir + global.enjin.js.file;
            del([cssBuildPath, jsBuildPath]).then(() => {
                if (done && typeof done === 'function') {
                    done();
                }
            }).catch((err) => {
                console.log('[ERROR] This happened: ' + err);
                if (done && typeof done === 'function') {
                    done();
                }
            });
        }, 1000);
    },
    //htmlInline,
    workbox,
    deploySsh
);