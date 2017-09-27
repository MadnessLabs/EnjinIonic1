const clean    = require('gulp-clean');
const jeditor  = require("gulp-json-editor");

const arrayRemove = require('./arrayRemove');


module.exports = function(name) {
    if (name.indexOf('-') < 0) {
        console.log('Component name must have a - in it');
        return false;
    }

    gulp.src([
        stenciljsConfig.srcDir + '/components/' + name + '/',
    ],{
        read: false
    })
    .pipe(clean({force: true}));

    gulp.src(configFile)
    .pipe(jeditor(function(json) {
        json.stenciljs.bundles[0].components = arrayRemove(json.stenciljs.bundles[0].components, name);
        return json; 
    }))
    .pipe(gulp.dest("./"));
};