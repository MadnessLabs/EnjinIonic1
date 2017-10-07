const setEnjinGlobal = require('./services/setEnjinGlobal');

module.exports = function() {
    setEnjinGlobal();
    return {
        tasksDir: 'node_modules/@enjin/ionic1/tasks.js',
        enjin: global.enjin
    }
};