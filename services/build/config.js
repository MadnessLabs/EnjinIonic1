const gulp = require('gulp');

const jsApp = require('../js/app');
const jsConfig = require('../js/config');
const cssConfig = require('../css/config');
const buildRun = require('./run');

const buildConfig = function(callback) {
    buildRun('config', [jsApp, jsConfig, cssConfig], callback);
};
buildConfig.displayName = 'Building configs fron enjin.json';

module.exports = buildConfig;