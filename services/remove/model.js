const del = require('del');


module.exports = function(params, callback) {
    var modelPath = `${process.cwd()}/${params.dir ? params.dir : global.enjin.js.srcDir + 'model'}/${params.name}.ts`;
    console.log(`Removing model @ ${modelPath}`);
    del([modelPath]).then(() => {
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