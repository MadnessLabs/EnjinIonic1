const gulp = require('gulp');
const _ = require('lodash');

const buildClean = require('./build/clean');
const setEnjinGlobal = require('./setEnjinGlobal');
const jsTasks = require('./js/tasks');
const cssTasks = require('./css/tasks');
const htmlInject = require('./html/inject');
const htmlTasks = require('./html/tasks');
const stencilBuild = require('./stencil');
const images = require('./images');
const buildRun = require('./build/run');
const fonts = require('./fonts');
const workbox = require('./workbox');


module.exports = function (callback) {
    if (global.synced) {
        global.browserSync.notify('Running build, please wait...');
    }

    setEnjinGlobal();
    var tasks = [];

    buildRun('js', jsTasks(), () => {
        buildRun('css', cssTasks(), () => {
            buildRun('html', htmlTasks(), () => {
                if (global.enjin.stenciljs && (!global.lastEnjin || !_.isEqual(global.lastEnjin.stenciljs, global.enjin.stenciljs))) {
                    tasks.push(stencilBuild);
                }

                if (global.enjin.img && (!global.lastEnjin || !_.isEqual(global.lastEnjin.img, global.enjin.img))) {
                    tasks.push(images);
                }

                if (global.enjin.font && (!global.lastEnjin || !_.isEqual(global.lastEnjin.font, global.enjin.font))) {
                    tasks.push(fonts);
                }
                if (global.enjin.local) {
                    tasks.push(htmlInject);
                }
                if (!global.enjin.local) {
                    tasks.push(workbox);
                }
                buildRun('config', tasks, callback);
            });
        });
    });
};