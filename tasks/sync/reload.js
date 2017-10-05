module.exports = function(gulp, callback) {
    if (global.isWatching) {
        browserSync.reload();
    }
    
    callback();
}