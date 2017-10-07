const gulp = require('gulp');
const concat = require('gulp-concat');
const intercept = require('gulp-intercept');
const sourcemapConcat = require('inline-sourcemap-concat');
const fs = require('fs-extra');

const cssConcat = function(callback) {
    const smConcat = sourcemapConcat.create({sourceRoot: '../../app/scss'});
    var concatPipe = gulp.src(global.enjin.css.build)
    .pipe(intercept(function(file) {
        var newContent = smConcat.addFileSource(file.path, file.contents.toString());
        file.contents = new Buffer(newContent);
        return file;
    }))
    .pipe(concat(global.enjin.css.file))
    .pipe(gulp.dest(global.enjin.root + global.enjin.css.dir));

    if (global.synced && global.reload) {
        concatPipe.pipe(global.browserSync.stream());
    }

    concatPipe.on('end', function() {
        fs.appendFile(`./${global.enjin.root}${global.enjin.css.dir}${global.enjin.css.file}`, smConcat.comment().replace('//#', '/*#') + ' */', function(err) {
            if(err) {
                console.log(err);
            }

            callback();
        });
    });  
};
cssConcat.displayName = 'Concatenating CSS to build.css';

module.exports = cssConcat;