const del = require('del');


module.exports = function(name, dir, callback) {
    controllerPath = `${process.cwd()}/${dir ? dir : global.enjin.js.srcDir + 'controller'}/${name}.ts`;
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