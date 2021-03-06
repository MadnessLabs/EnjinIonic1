const renderToFile = require('../renderToFile');


module.exports = function(params, callback) {
    renderToFile(
        `${global.enjin.tmplDir}ts/filter.ts`,
        {
            app: global.enjin.name,
            name: params.name
        },
        `${global.enjin.js.srcDir}filter/${params.name}.ts`,
        function(file) {
            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    );
};