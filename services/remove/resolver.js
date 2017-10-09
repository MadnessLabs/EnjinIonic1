const del = require('del');


module.exports = function(params, callback) {
    var resolverPath = `${process.cwd()}/${params.dir ? params.dir : global.enjin.js.srcDir + 'resolver'}/${params.name}.ts`;
    console.log(`Removing directive @ ${resolverPath}`);
    del([resolverPath]).then(() => {
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