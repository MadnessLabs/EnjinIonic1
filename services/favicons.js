const favicons = require('favicons');


module.exports = function(callback) {
    if (!global.enjin.favicon && !global.enjin.img.favicon) {
        console.log('Favicon required in enjin.json as favicon or img.favicon!');
        callback();
        return false;
    }

    var configuration = global.enjin.favicons ? global.enjin.favicons : {
        appName: global.enjin.name,
        appDescription: global.enjin.description,
        background: global.enjin.background ? global.enjin.background : "#fff",
        url: global.enjin.url,
        path: '/img/icon/',
        version: global.enjin.version,
        logging: true,
        html: global.enjin.html.srcDir + 'favicon.pug'
    };

    favicons(global.enjin.favicon ? global.enjin.favicon : global.enjin.img.favicon, configuration, callback);
};