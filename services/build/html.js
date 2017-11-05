const gulp = require('gulp');

const htmlCompile = require('../html/inject');
const buildRun = require('./run');

const buildHtml = function(callback) {
    buildRun('html', [htmlCompile], callback);
};
buildHtml.displayName = 'Building HTML files...';

module.exports = buildHtml;