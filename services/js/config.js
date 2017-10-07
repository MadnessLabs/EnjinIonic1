const gulp = require('gulp');
const ngConfig = require('ng-config');
const fs = require('fs-extra');

const jsConfig = function(callback) {
    var configFilePath = `${process.cwd()}/${global.enjin.buildDir}${global.enjin.js.dir}config.js`;
    var configFile = ngConfig({
        module: `${global.enjin.name}.config`,
        constants: {
            enjin: global.enjin
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