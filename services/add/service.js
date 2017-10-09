const renderToFile = require('../renderToFile');
const capFirstLetter = require('../capFirstLetter');


module.exports = function(params, callback) {
    renderToFile(
        `${global.enjin.tmplDir}ts/service.ts`,
        {
            app: global.enjin.name,
            name: capFirstLetter(params.name),
            nameLower: params.name.toLowerCase()
        },
        `${global.enjin.js.srcDir}service/${params.name}.ts`,
        function(file) {
            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    );
};