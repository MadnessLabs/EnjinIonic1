const gulp = require('gulp');
const browserSync = require('browser-sync');

const syncStart = function(done) {
    // [
        // global.enjin.root + global.enjin.css.dir + global.enjin.css.file
        // global.enjin.root + global.enjin.html.dir + '**/*.html', 
        // global.enjin.root + 'index.html', 
        // global.enjin.root + global.enjin.js.dir + global.enjin.js.file,
        // global.enjin.stenciljs.distDir + '/' + global.enjin.stenciljs.namespace + '.js'
    // ];
    global.browserSync = browserSync.create('enjin_server');
    global.enjin.browserSync = global.enjin.browserSync ? global.enjin.browserSync : {};
    var bsOpts = {
        port: global.enjin.browserSync.port ? global.enjin.browserSync.port : global.enjin.port ? global.enjin.port : 3000,
        files: global.enjin.browserSync.files ? global.enjin.browserSync.files : global.enjin.css.build,
        reloadDebounce: global.enjin.browserSync.reloadDebounce ? global.enjin.browserSync.reloadDebounce : 100,
        injectChanges: global.enjin.browserSync.injectChanges ? global.enjin.browserSync.injectChanges : true,
        logFileChanges: global.enjin.browserSync.logFileChanges ? global.enjin.browserSync.logFileChanges : true,
        logLevel: global.enjin.browserSync.logLevel ? global.enjin.browserSync.logLevel : 'info',
        logPrefix: global.enjin.browserSync.logPrefix ? global.enjin.browserSync.logPrefix : global.enjin.name,
        notify: global.enjin.browserSync.notify ? global.enjin.browserSync.notify : true,
        open: global.enjin.browserSync.open ? global.enjin.browserSync.open : true,
        browser: global.enjin.browserSync.browser ? global.enjin.browserSync.browser : global.enjin.browser ? global.enjin.browser : 'default'
    };

    if (global.enjin.proxy || global.enjin.browserSync.proxy) {
        bsOpts.proxy = global.enjin.browserSync.proxy ? global.enjin.browserSync.proxy : global.enjin.proxy;
        bsOpts.open = 'external';
        bsOpts.host = global.enjin.browserSync.proxy ? global.enjin.browserSync.proxy : global.enjin.proxy;
    } else {
        bsOpts.server = {
            baseDir: ['./', global.enjin.root]
        };
    }

    global.browserSync.init(bsOpts);
    global.synced = true;
    global.reload = true;
    done();
};
syncStart.displayName = 'Starting live reloading webserver';

module.exports = syncStart;