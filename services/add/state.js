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

    if (!params.view) {
        params.view = 'tab';
    }

    var data = {name: params.name};
    renderToFile(
        `${global.enjin.tmplDir}pug/state.pug`, 
        data, 
        `${global.enjin.html.srcDir}state/${params.name}.pug`,
        function(pugFile) {
            renderToFile(
                `${global.enjin.tmplDir}scss/state.scss`,
                data,
                `${global.enjin.css.srcDir}state/${params.name}.scss`,
                function(scssFile) {
                    addController({
                        name: params.name, 
                        dir: 'state', 
                        dependencies: params.resolves
                    }, () => {
                        var stateSteps = params.name.split(/(?=[A-Z])/);
                        var state = stateSteps.join(".").toLowerCase();
                        addRoute({
                            name: state, 
                            url: '/'+stateSteps[stateSteps.length - 1].toLowerCase(), 
                            template: 'html/state/'+params.name+'.html', 
                            controller: capFirstLetter(params.name)+'Controller', 
                            resolver: params.resolves ? capFirstLetter(params.name)+'Resolver' : false, 
                            view: params.view
                        }, () => {
                            if (params.resolves) {
                                addResolver({
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