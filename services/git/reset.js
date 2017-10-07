const exec = require('child_process').exec;


module.exports = function(callback) {
    exec('git reset --hard', function(error, stdout, stderr) {
        console.log(stdout);
        if (callback && typeof callback === 'function') {
            callback();
        }
    });
};