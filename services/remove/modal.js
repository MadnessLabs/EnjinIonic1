const del = require('del');


module.exports = function(params, callback) {
    var modalPugPath = `${process.cwd()}/${global.enjin.html.srcDir}modal/${params.name}.pug`;
    var modalScssPath = `${process.cwd()}/${global.enjin.css.srcDir}modal/${params.name}.scss`;
    var modalHtmlPath = `${process.cwd()}/${global.enjin.root}${global.enjin.html.dir}modal/${params.name}.html`;
    console.log(`Removing modal @`);
    console.log(modalPugPath);
    console.log(modalScssPath);
    console.log(modalHtmlPath);
    del([modalPugPath, modalScssPath, modalHtmlPath]).then(() => {
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