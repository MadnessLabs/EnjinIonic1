const del = require('del');

const editEnjin = require('../editEnjin');


module.exports = function(params, callback) {
    var newRoutes = global.enjin.routes;
    for(var i=0; i < newRoutes.length; i++){
        var route = newRoutes[i];
        if(route.state === params.name){
            newRoutes.splice(i,1);
            editEnjin({"<routes": newRoutes});
        }
    }

    var scssPath = global.enjin.css.srcDir + 'page/' + params.name + '.scss';
    var pugPath = global.enjin.html.srcDir + 'page/' + params.name + '.pug';
    var htmlPath = global.enjin.root + global.enjin.html.dir + 'page/' + params.name + '.html';
    var tsPath = global.enjin.js.srcDir + 'page/' + params.name + '.ts';
    var resolverPath = global.enjin.js.srcDir + 'resolver/' + params.name + '.ts';

    console.log(`Removing page @`);
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