const _       = require('lodash');
const fs      = require('fs-extra');
var path      = require("path");


module.exports = function (templatePath, data, outputPath, callback = false, context = process.cwd()) {
    fs.exists(path.resolve(context, outputPath), (exists) => {
        if (exists) {
            if (callback && typeof callback === 'function') {
                callback({error: true, message: `${outputPath} file already exists!`});
            }
            return false;
        } else {
            fs.readFile(path.resolve(__dirname, templatePath), 'UTF-8', (err, templateFile) => {
                var renderedTemplate = _.template(templateFile)(data);
                fs.outputFile(path.resolve(context, outputPath), renderedTemplate, (err) => {
                    if (err) {
                        return err;
                    } else {
                        if (callback && typeof callback === 'function') {
                            callback(renderedTemplate);
                        }
                        return renderedTemplate;
                    }
                });
            });
        }
    });
};