const renderToFile = require('../renderToFile');
const capFirstLetter = require('../capFirstLetter');
const stateExists = require('../stateExists'); 
const addController = require('./controller');
const addRoute = require('./route');
const addResolver = require('./resolver');


module.exports = function(params, callback) {
    if (stateExists(params.name)) {
        console.log(`${params.name} state already exists!`);
        callback();
        return false;
    }

    var data = {name: params.name};
    renderToFile(
        `${global.enjin.tmplDir}pug/page.pug`, 
        data, 
        `${global.enjin.html.srcDir}page/${params.name}.pug`,
        function(pugFile) {
            renderToFile(
                `${global.enjin.tmplDir}scss/page.scss`,
                data,
                `${global.enjin.css.srcDir}page/${params.name}.scss`,
                function(scssFile) {
                    addController({
                        name: params.name, 
                        dir: 'page', 
                        dependencies: params.resolves
                    }, () => {
                        addRoute({
                            name: params.name, 
                            url: '/'+params.name, 
                            template: 'html/page/'+params.name+'.html', 
                            controller: capFirstLetter(params.name)+'Controller',
                            resolver: params.resolves || global.enjin.lazyLoad ? capFirstLetter(params.name)+'Resolver' : false
                        }, () => {
                            if (params.resolves || global.enjin.lazyLoad) {
                                addResolver({
                                    type: 'page',
                                    name: params.name, 
                                    resolves: params.resolves
                                }, callback);
                            } else {
                                if (callback && typeof callback === 'function') {
                                    callback();
                                }
                            }
                        });
                    });
                }
            );
        }
    );
};