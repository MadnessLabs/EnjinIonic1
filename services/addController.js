const rename   = require('gulp-rename');
const template = require('gulp-template');

const capFirstLetter = require('./capFirstLetter');


module.exports = function(name, dir, dependencies) {
    var destDir = jsSrcDir + dir + '/';
    gulp.src(tmplDir+'ts/controller.ts')
        .pipe(template({
            app: appName,
            name: capFirstLetter(name),
            dependencies: dependencies    
        }))
        .pipe(rename(name+'.ts'))
        .pipe(gulp.dest(destDir));
};