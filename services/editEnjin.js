const fs = require('fs-extra');

const merge = require('./merge'); 


module.exports = function(data, callback, env, context = process.cwd()) {
    const enjinPath = `${context}/enjin${env ? '.' + env : ''}.json`;
    fs.readJSON(enjinPath).then((enjin) => {
        fs.writeJson(enjinPath, merge(enjin, data), {spaces: 4}).then(() => {
            if (callback && typeof callback === 'function') {
                callback();
            }
        });
    });
};