const del = require('del');


module.exports = function(params, callback) {
    directivePath = `${process.cwd()}/${params.dir ? params.dir : global.enjin.js.srcDir + 'directive'}/${params.name}.ts`;
    console.log(`Removing directive @ ${directivePath}`);
    del([directivePath]).then(() => {
        if (callback && typeof callback === 'function') {
            callback();
        }
    }).catch((err) => {
        console.log('[ERROR] This happened: ' + err);
        if (callback && typeof callback === 'function') {
            callback();
        }
    });
};