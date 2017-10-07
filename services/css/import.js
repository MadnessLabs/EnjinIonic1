const gulp = require('gulp');
const template = require('gulp-template');

const cssImport = function(callback) {
    var imports = "";
    for(var i=0; i < global.enjin.css.libraries.length; i++){
        var cssLib = global.enjin.css.libraries[i];
        imports += '@import "../../'+cssLib+'";\n';
    }

    gulp.src(global.enjin.tmplDir+'scss/libraries.scss')
        .pipe(template({'libraries': imports}))
        .pipe(gulp.dest(global.enjin.css.srcDir))
        .on('end', function() {
            callback();
        });
};
cssImport.displayName = 'Creating import file for libraries';

module.exports = cssImport;