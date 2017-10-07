const gulp = require('gulp');

const jsConfig = require('../js/config');
const jsCompile = require('../js/compile');
const jsConcat = require('../js/concat');
const jsMinify = require('../js/minify');


module.exports = gulp.series(gulp.parallel(jsConfig, jsCompile), jsConcat, jsMinify);