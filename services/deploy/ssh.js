const Deployer = require('ssh-deploy-release');
const fs = require('fs-extra');

const deploySshTask = function(callback) {
    if (!global.enjin.deploy || !global.enjin.deploy.options || !global.enjin.deploy.options.host) {
        console.log('Please setup deploy object in one of your enjin env files!');
        if (callback && typeof callback === 'function') {
            callback();
        }
    }

    var opts = global.enjin.deploy.options;
    opts.localPath = opts.localPath ? opts.localPath : global.enjin.root;

    const deploy = new Deployer(opts);
    deploy.deployRelease(() => {
        console.log(`App has been successfully deployed to ${opts.host}!`);
        if (callback && typeof callback === 'function') {
            callback();
        }
    });
};
deploySshTask.displayName = 'Deploying your project via SSH';

module.exports = deploySshTask;