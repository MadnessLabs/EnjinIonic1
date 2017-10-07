const exec = require('child_process').exec;

const stencilBuild = function(callback) {
    exec('npm run stencil', function(error, stdout, stderr) {
        console.log(stdout);
        if (global.synced && global.reload) {
            global.browserSync.reload();
        }
        callback();
    });
};
stencilBuild.displayName = 'Building web components';

module.exports = stencilBuild;