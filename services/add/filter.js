const renderToFile = require('../renderToFile');
const capFirstLetter = require('../capFirstLetter');


module.exports = function(params, callback) {
    renderToFile(
        `${global.enjin.tmplDir}ts/controller.ts`,
        {
            app: global.enjin.name,
            name: capFirstLetter(params.name),
            dependencies: params.dependencies && params.dependencies.indexOf(',') >= 0 ? params.dependencies.split(',') : ''
        },
        `${global.enjin.js.srcDir}controller/${params.name}.ts`,
        function(file) {
            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    );
};