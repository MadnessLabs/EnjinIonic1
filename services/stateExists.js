const fs = require('fs-extra');


module.exports = function(name) {
    var newRoutes = global.enjin.routes;
    var state = name.split(/(?=[A-Z])/).join(".").toLowerCase();
    for(var i=0; i < newRoutes.length; i++){
        var route = newRoutes[i];
        if (route.state === state) {
            return true;
        }
    }

    return false;
};