const editEnjin = require('../editEnjin');


module.exports = function(params, callback) {
    var newRoutes = global.enjin.routes;
    for(var i=0; i < newRoutes.length; i++){
        var route = newRoutes[i];
        if(route.state === params.name){
            newRoutes.splice(i,1);
            editEnjin({"<routes": newRoutes}, callback);
        }
    }
};