const fs = require('fs-extra');


module.exports = function(callback) {
    const buildDir = `${process.cwd()}/${global.enjin.stenciljs.distDir ? global.enjin.stenciljs.distDir : 'www/components'}`;
    fs.remove(buildDir, (err) => {
        if (err) {
            return console.error(err);
        }

        console.log(`Removed stencil build dir ${buildDir}...`);

        if (callback && typeof callback === 'function') {
            callback();
        }
    });
};