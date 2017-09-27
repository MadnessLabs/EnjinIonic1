const fs = require('fs-extra');
const path = require("path");

const renderToFile = require('./renderToFile');
const camelize = require('./camelize');
const capFirstLetter = require('./capFirstLetter');

module.exports = function (name, props = false, callback = false) {
    if (name.indexOf('-') <= 0) {
        if (callback && typeof callback === 'function') {
            callback({error: true, message: 'Component name must contain a "-" to be valid!'});
        }
        return false;
    }

    name = name.toLowerCase();

    if (props) {
        if (props.indexOf(',') > 0) {
            props = props.split(',');
        } else {
            props = [props];
        }
    }

    var data = {
        name,
        className: capFirstLetter(camelize(name.replace('-', ' '))),
        props
    };

    var outputDir = `${stenciljsConfig.srcDir}/components/${name}`;

    fs.exists(path.resolve(process.cwd(), outputDir), (exists) => {
        if (exists) {
            if (callback && typeof callback === 'function') {
                callback({error: true, message: `${name} component already exists!`});
            }
            return false;
        } else {
            renderToFile(
                '../../components/template/component.scss',
                data,
                `${outputDir}/${name}.scss`,
                (scssFile) => {
                    renderToFile(
                        '../../components/template/component.tsx',
                        data,
                        `${outputDir}/${name}.tsx`,
                        (tsxFile) => {
                            enjinJSON.stenciljs.bundles[0].components.push(name);
                            fs.writeFile(path.resolve(process.cwd(), configFile), JSON.stringify(enjinJSON, null, 4), function (err) {
                                if (err) {
                                    if (callback && typeof callback === 'function') {
                                        callback({error: true, message: 'Couldn\'t edit StencilJS Config...'});
                                    }
                                    return false;
                                }
                            
                                if (callback && typeof callback === 'function') {
                                    callback({scssFile, tsxFile, data});
                                }
                            });
                        }
                    );
                }
            );
        }
    });

    return true;
};