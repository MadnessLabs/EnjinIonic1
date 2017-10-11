const gulp = require('gulp');
const wbBuild = require('workbox-build');
const del = require('del');

const workbox = function(callback) {
    if (global.enjin.local) {
        console.log('Skipping service worker on local build...');
        callback();
    }
    
    var wbOpts = global.enjin.workboxjs ? global.enjin.workboxjs : {
        globDirectory: global.enjin.root,
        swDest: global.enjin.workboxDest ? global.enjin.workboxDest : global.enjin.root + 'sw.js',
        globPatterns: global.enjin.workboxPatterns ? global.enjin.workboxPatterns : ['**\/*.{html,js,css}'],
        globIgnores: global.enjin.workboxIgnores ? global.enjin.workboxIgnores : [],
        maximumFileSizeToCacheInBytes: 3000000
    };

    del([wbOpts.swDest, wbOpts.globDirectory + 'workbox-sw.*']).then(() => {
        wbBuild.generateSW(wbOpts).then(() => {
            console.log('Service worker generated.');        
            callback();
        }).catch((err) => {
            console.log('[ERROR] This happened: ' + err);
            callback();
        });
    });
};
workbox.displayName = 'Generating service worker with workbox';


module.exports = workbox;