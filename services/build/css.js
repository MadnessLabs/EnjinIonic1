const gulp = require('gulp');

const cssConfig = require('../css/config');
const cssImport = require('../css/import');
const cssLibraries = require('../css/libraries');
const cssCompile = require('../css/compile');
const cssConcat = require('../css/concat');
const cssMinify = require('../css/minify');


module.exports = gulp.series(gulp.parallel(cssConfig, cssImport), gulp.parallel(cssLibraries, cssCompile), cssConcat, cssMinify);