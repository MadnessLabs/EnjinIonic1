const del = require('del');

const editEnjin = require('../editEnjin');


module.exports = function(params, callback) {
    var newRoutes = global.enjin.routes;
    var stateSteps = params.name.split(/(?=[A-Z])/);
    var state = stateSteps.join(".").toLowerCase();
    for(var i=0; i < newRoutes.length; i++){
        var route = newRoutes[i];
        if(route.state === state){
            newRoutes.splice(i,1);
            editEnjin({"<routes": newRoutes}, callback);
        }
    }

    var scssPath = global.enjin.css.srcDir + 'state/' + params.name + '.scss';
    var pugPath = global.enjin.html.srcDir + 'state/' + params.name + '.pug';
    var htmlPath = global.enjin.root + global.enjin.html.dir + 'state/' + params.name + '.html';
    var tsPath = global.enjin.js.srcDir + 'state/' + params.name + '.ts';
    var resolverPath = global.enjin.js.srcDir + 'resolver/' + params.name + '.ts';

    console.log(`Removing state @`);
    console.log(scssPath);
    console.log(pugPath);
    console.log(htmlPath);
    console.log(tsPath);
    console.log(resolverPath);

    del([scssPath, pugPath, htmlPath, tsPath, resolverPath]).then(() => {
        if (callback && typeof callback === 'function') {
            callback();
        }
    }).catch((err) => {
        console.log('[ERROR] This happened: ' + err);
        if (callback && typeof callback === 'function') {
            callback();
        }
    });
};