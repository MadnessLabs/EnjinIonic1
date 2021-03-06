const renderToFile = require('../renderToFile');
const capFirstLetter = require('../capFirstLetter');


module.exports = function(params, callback) {
    var resolves = params.resolves && params.resolves.indexOf(',') ? params.resolves.split(',') : params.resolves ? params.resolves : []; 

    if (global.enjin.lazyLoad) {
        resolves.push('lazyLoader');
    }

    renderToFile(
        `${global.enjin.tmplDir}ts/resolver.ts`,
        {
            app: global.enjin.name,
            name: capFirstLetter(params.name),
            resolves: resolves,
            lazyLoad: global.enjin.lazyLoad && params.type ? global.enjin.js.dir + params.type + '/' + params.name + '.js' : false
        },
        `${global.enjin.js.srcDir}resolver/${params.name}.ts`,
        function(file) {
            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    );
};