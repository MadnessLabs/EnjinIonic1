const buildJs = require('./build/js');
const buildCss = require('./build/css');
const stencilBuild = require('./stencil');
const htmlCompile = require('./html/compile');
const images = require('./images');


module.exports = function() {
    var tasks = [buildJs, buildCss, htmlCompile];
    if (global.enjin.stenciljs) {
        tasks.push(stencilBuild);
    }
    if (global.enjin.img) {
        tasks.push(images);
    }
    
    return tasks;
};