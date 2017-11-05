const _ = require('lodash');

const jsApp = require('./app');
const jsRouter = require('./router');
const jsConfig = require('./config');
const jsCompile = require('./compile');
const jsConcat = require('./concat');
const jsMinify = require('./minify');
const jsCopy = require('./copy');


module.exports = function() {
    var tasks = global.synced ? [] : [jsApp, jsRouter, jsConfig, jsCompile, jsCopy];
    
    if (global.synced && global.lastEnjin && !_.isEqual(global.lastEnjin, global.enjin)) {
        tasks.push(jsConfig);
        if (!_.isEqual(global.lastEnjin.plugins, global.enjin.plugins)) {
            tasks.push(jsApp);
        }
        if (!_.isEqual(global.lastEnjin.routes, global.enjin.routes)) {            
            tasks.push(jsRouter);
        }
        if (!_.isEqual(global.lastEnjin.js, global.enjin.js)) {
            tasks.push(jsCompile, jsCopy);
        }
    }
    if (!global.enjin.local) {
        tasks.push(jsConcat, jsMinify);
    }

    return tasks;
};