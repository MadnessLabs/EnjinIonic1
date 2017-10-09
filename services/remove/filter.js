const del = require('del');


module.exports = function(params, callback) {
    var filterPath = `${process.cwd()}/${params.dir ? params.dir : global.enjin.js.srcDir + 'filter'}/${params.name}.ts`;
    console.log(`Removing filter @ ${filterPath}`);
    del([filterPath]).then(() => {
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