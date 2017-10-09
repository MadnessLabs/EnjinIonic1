const renderToFile = require('../renderToFile');
const capFirstLetter = require('../capFirstLetter');
const stateExists = require('../stateExists');
const editEnjin = require('../editEnjin');


module.exports = function(params, callback) {
    if (stateExists(params.name)) {
        console.log(`${params.name} state already exists!`);
        callback();
        return false;
    }

    if (!params.view) {
        params.view = 'tab';
    }
    var newRoutes = global.enjin.routes;
    var newState = {
        state: params.name,
        url: params.url
    };

    if (params.name.indexOf('.') > 0) {
        var stateSteps = params.name.split('.');
        for(var i = 0; i < newRoutes.length; i++) {
            var route = newRoutes[i];
            if (route.state == stateSteps[0] && !route.abstract) {
                route.abstract = true;
            }
            newRoutes[i] = route;
        }

        newState.views = {
            [params.view]: {
                templateUrl: params.template,
                controller: global.enjin.name + '.' + params.controller,
                controllerAs: params.view
            }
        };
        if (params.resolver) {
            newState.views[params.view].resolve = params.resolver;
        }
    } else {
        newState.templateUrl = params.template;
        newState.controller = global.enjin.name + '.' + params.controller;
        newState.controllerAs = 'ctrl';
        if (params.resolver) {
            newState.resolve = params.resolver;
        }
    }

    newRoutes.push(newState);
    editEnjin({"<routes": newRoutes}, callback);
};