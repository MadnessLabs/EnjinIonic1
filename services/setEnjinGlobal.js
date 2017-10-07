const fs = require('fs-extra');
const argv = require('yargs').argv

const merge = require('./merge');


module.exports = function() {
    var envFiles = [process.cwd() + '/enjin.json'];
    var enjins = [
        require(process.cwd() + '/enjin/enjin.defaults.json'),
        JSON.parse(fs.readFileSync(envFiles[0]))
    ];
    if (argv.env) {
        process.env.NODE_ENV = argv.env;
        try {
            var newEnv = `${process.cwd()}/enjin.${argv.env}.json`;
            envFiles.push(newEnv);
            enjins.push(JSON.parse(fs.readFileSync(newEnv)), {env: argv.env});
            console.log(`Loading enjin.${argv.env}.json environment...`);
        } catch(e) {
            console.log(`Couldn't find enjin.${argv.env}.json file in current directory!`);
            throw e;
            return false;
        }
    }
    global.enjin = merge(...enjins, {envFiles: envFiles});
    global.enjin.tmplDir = global.enjin.tmplDir ? global.enjin.tmplDir : process.cwd() + '/node_modules/@enjin/ionic1/templates/';
    global.enjin.path = process.cwd() + '/enjin.json';
    if (global.enjin.stenciljs && !global.enjin.stenciljs.watch) {
        global.enjin.stenciljs.watch = [
            `${global.enjin.stenciljs.srcDir}/**`,
            `!${global.enjin.stenciljs.srcDir}/components.d.ts`
        ];
    }
};