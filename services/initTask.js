const inquirer = require('inquirer');
const argv     = require('yargs').argv;


module.exports = function(command, subcommand = null, callback = false) {
    var currentCommand = {};
    if (subcommand) {
        currentCommand = global.enjin.commands[command] && global.enjin.commands[command]['subcommands'][subcommand] ? global.enjin.commands[command]['subcommands'][subcommand] : {}; 
        this.displayName = currentCommand['description'] ? currentCommand['description'] : `${command}:${subcommand}`;
        this.service = require(currentCommand['service'] ? process.cwd() + '/' + currentCommand['service'] : `../services/${command}/${subcommand}`);
        this.questions = currentCommand['questions'] ? currentCommand['questions'] : false;
    } else {
        currentCommand = global.enjin.commands[command] ? global.enjin.commands[command] : {};
        this.displayName = currentCommand['description'] ? currentCommand['description'] : `${command}`;
        this.service = require(currentCommand['service'] ? process.cwd() + '/' + currentCommand['service'] : `../services/${command}`);
        this.questions = currentCommand['questions'] ? currentCommand['questions'] : false;
    }
    
    if (Object.keys(argv).length >= 5) {
        var params = {};
        if (this.questions) {
            this.questions.map((question) => {
                params[question.name] = argv[question.alias] ? argv[question.alias] : question.default ? question.default : null;
            });
            this.service(params, callback);
        } else {
            this.service(callback);
        }
    } else {
        if (this.questions) {
            inquirer.prompt(this.questions).then((res) => {
                service(res, callback);
            });
        } else {
            service(callback);
        }
    }
};