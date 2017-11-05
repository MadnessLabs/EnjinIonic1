const gulp = require('gulp');

const jsCompile = require('../js/compile');
const jsCopy = require('../js/copy');
const buildRun = require('./run');

const buildJs = function(callback) {
    global.injectHtml = true;
    buildRun('js', [jsCompile, jsCopy], callback);
};
buildJs.displayName = 'Building JS files';

module.exports = buildJs;