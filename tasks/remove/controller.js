const inquirer = require('inquirer');
const argv     = require('yargs').argv;

const removeController = require('../../services/remove/controller');

const removeControllerTask = function(callback) {
    if (argv.n) {
        removeController(argv.n, argv.d, callback);
    } else {
        inquirer.prompt([{
            type: 'input',
            message: 'What is the state name of the page you would like to remove?',
            name: 'name'
        }, {
            type: 'input',
            message: `What is the directory of the controller?`,
            name: 'dir',
            default: `${global.enjin.js.srcDir}controller`
        }]).then((res) => {
            removeController(res.name, res.dir, callback);
        });
    }
};
removeControllerTask.displayName = 'Removing controller from project';

module.exports = removeControllerTask;