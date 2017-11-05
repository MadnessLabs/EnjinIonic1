const gulp = require('gulp');

const cssCompile = require('../css/compile');
const buildRun = require('./run');

const buildCss = function(callback) {
    global.injectHtml = true;
    buildRun('css', [cssCompile], callback);
};
buildCss.displayName = 'Bulding CSS files...';


module.exports = buildCss;