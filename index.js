const setEnjinGlobal = require('./services/setEnjinGlobal');

module.exports = function() {
    setEnjinGlobal();
    return {
        tasksDir: 'node_modules/@enjin/ionic1/services/tasks.js',
        enjin: global.enjin
    }
};