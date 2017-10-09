const del = require('del');


module.exports = function(params, callback) {
    var controllerPath = `${process.cwd()}/${params.dir ? params.dir : global.enjin.js.srcDir + 'controller'}/${params.name}.ts`;
    console.log(`Removing controller @ ${controllerPath}`);
    del([controllerPath]).then(() => {
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