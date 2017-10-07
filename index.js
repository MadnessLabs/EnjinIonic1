const setEnjinGlobal = require('./services/setEnjinGlobal');

module.exports = function() {
    setEnjinGlobal();
    return {
        tasksDir: 'enjin/tasks.js',
        enjin: global.enjin
    }
};