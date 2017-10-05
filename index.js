argv          = require('yargs').argv;
browserSync   = require('browser-sync').create();

const setVars = require('./services/setVars');
const slash   = require('slash');
const path    = require('path');


module.exports = function(){
    environment = argv.e ? argv.e : false;
    global.isWatching = false;
    global.synced     = false;
    global.isError    = false;
    Now = new Date();
    deployEnv = argv.e ? argv.e : 'app';
    deploy = {
        env: deployEnv,
        note: argv.n ? argv.n : Now.toLocaleDateString() + ' ' + Now.toLocaleTimeString(),
        branch: deployEnv == 'app' ? 'dev' : 'production'
    };
    global.skipBrowserOpen = argv.b ? argv.b : false;
    setVars();
    console.log(environment);
};