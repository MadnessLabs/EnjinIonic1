const fs = require('fs-extra');
const cache = require('gulp-cached');

const buildClean = function(callback) {
    cache.caches = {};
    const buildDir = `${process.cwd()}/${global.enjin.buildDir}`;
    fs.remove(buildDir, (err) => {
        if (err) {
            return console.error(err);
        }

        console.log(`Removed build dir ${buildDir}...`);

        if (callback && typeof callback === 'function') {
            callback();
        }
    });
};
buildClean.displayName = 'Cleaning build directory and cache';


module.exports = buildClean;