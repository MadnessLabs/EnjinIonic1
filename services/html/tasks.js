const _ = require('lodash');

const htmlCompile = require('./compile');
const htmlInject = require('./inject');
const htmlInline = require('./inline');


module.exports = function() {
    var tasks = global.synced ? [] : [htmlCompile];

    if (global.synced && global.lastEnjin && !_.isEqual(global.lastEnjin.html, global.enjin.html)) {
        tasks.push(htmlCompile);
    }
    if (!global.enjin.local) {
        tasks.push(htmlInline);
    }
    
    return tasks;
};