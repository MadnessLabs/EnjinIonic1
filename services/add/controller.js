const renderToFile = require('../renderToFile');
const capFirstLetter = require('../capFirstLetter');


module.exports = function(name, dir, dependencies, callback) {
    renderToFile(
        `${global.enjin.tmplDir}ts/controller.ts`,
        {
            app: global.enjin.name,
            name: capFirstLetter(name),
            dependencies: dependencies    
        },
        `${global.enjin.js.srcDir}controller/${name}.ts`,
        function(file) {
            console.log('I ran');
            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    )
};