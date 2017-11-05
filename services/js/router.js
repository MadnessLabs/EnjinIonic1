const gulp = require('gulp');
const template = require('gulp-template');

const router = function(callback) {
    var resolves = [];
    var defaultRoute = global.enjin.defaultRoute ? global.enjin.defaultRoute : false;
    
    for (var i=0; i < global.enjin.routes.length; i++) {
        var route = global.enjin.routes[i];
        if (!defaultRoute) {
            defaultRoute = route.state;
        }
        if (route.resolve) {
            resolves.push(route.resolve);
        }
    }

    
    gulp.src(global.enjin.tmplDir+'ts/router.ts')
        .pipe(template({
            app: global.enjin.name,
            routes: global.enjin.routes,
            defaultRoute: defaultRoute,
            typings: '../typings/index.d.ts'
        }))
        .pipe(gulp.dest(global.enjin.js.srcDir))
        .on('end', function() {
            callback();
        });
};
router.displayName = 'Generating router from enjin.json routes';

module.exports = router;