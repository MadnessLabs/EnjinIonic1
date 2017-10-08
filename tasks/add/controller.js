const inquirer = require('inquirer');
const argv     = require('yargs').argv;

const addController = require('../../services/add/controller');

const addControllerTask = function(callback) {
    if (argv.n) {
        addController(argv.n, 'controller', argv.d ? argv.d.split(',') : [], callback);
    } else {
        inquirer.prompt([{
            type: 'input',
            message: 'What is the name of the controller?',
            name: 'controller'
        }, {
            type: 'input',
            message: 'What dependencies need to be injected? (Comma Separated List)',
            name: 'dependencies'
        }]).then((res) => {
            addController(res.controller, 'controller', res.dependencies.split(','), callback);
        });
    }
};
addControllerTask.displayName = `Adding controller to project`;

module.exports = addControllerTask;