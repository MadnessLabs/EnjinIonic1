const del = require('del');


module.exports = function(params, callback) {
    var scssPath = global.enjin.css.srcDir + 'popover/' + params.name + '.scss';
    var pugPath = global.enjin.html.srcDir + 'popover/' + params.name + '.pug';
    var htmlPath = global.enjin.root + global.enjin.html.dir + 'popover/' + params.name + '.html';
    
    console.log(`Removing popover @ `);
    console.log(scssPath);
    console.log(pugPath);
    console.log(htmlPath);

    del([scssPath, pugPath, htmlPath]).then(() => {
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