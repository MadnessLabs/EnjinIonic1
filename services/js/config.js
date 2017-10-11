const gulp = require('gulp');
const ngConfig = require('ng-config');
const fs = require('fs-extra');

const jsConfig = function(callback) {
    var configFilePath = `${global.enjin.buildDir}${global.enjin.js.dir}config.js`;
    var enjin = {...global.enjin};
    enjin.deploy = null;
    enjin.android = null;
    enjin.commands = null;
    var configFile = ngConfig({
        module: `${global.enjin.name}.config`,
        constants: {
            enjin: enjin
        }
    });

    fs.outputFile(configFilePath, configFile, (err) => {
        if (err) {
            console.log(err);
        }

        callback();
    });
};
jsConfig.displayName = 'Creating js config file with enjin vars';

module.exports = jsConfig;