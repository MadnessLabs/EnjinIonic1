const del = require('del');


module.exports = function(params, callback) {
    var servicePath = `${process.cwd()}/${params.dir ? params.dir : global.enjin.js.srcDir + 'service'}/${params.name}.ts`;
    console.log(`Removing service @ ${servicePath}`);
    del([servicePath]).then(() => {
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