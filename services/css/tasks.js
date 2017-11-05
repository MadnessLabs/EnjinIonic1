const _ = require('lodash');

const cssConfig = require('./config');
const cssImport = require('./import');
const cssLibraries = require('./libraries');
const cssCompile = require('./compile');
const cssConcat = require('./concat');
const cssMinify = require('./minify');

module.exports = function() {
    var tasks = global.synced ? [] : [cssConfig, cssImport, cssLibraries, cssCompile];

    if (global.synced && global.lastEnjin && !_.isEqual(global.lastEnjin.css, global.enjin.css)) {
        if (!_.isEqual(global.lastEnjin.css.vars, global.enjin.css.vars)) {
            tasks.push(cssConfig);
        }
        if (!_.isEqual(global.lastEnjin.css.libraries, global.enjin.css.libraries)) {
            tasks.push(cssImport, cssLibraries);
        }
        tasks.push(cssCompile);
    }
    if (!global.enjin.local){ 
        tasks.push(cssConcat, cssMinify);
    }
    
    return tasks;
};
 