const gulp = require('gulp');

const initTask = require('./initTask');


Object.keys(global.enjin.commands).map((command) => {
    if (global.enjin.commands[command]['subcommands']) {
        if (global.enjin.commands[command]['direct']) {
            gulp.task(command, require(global.enjin.commands[command]['service'] ? process.cwd() + '/' + global.enjin.commands[command]['service'] : `./${command}`));
        } else if (global.enjin.commands[command]['include']) {
            gulp.task(command, function(done) {
                initTask(command, null, done);
            });
        }
        Object.keys(global.enjin.commands[command]['subcommands']).map((subcommand) => {
            if (global.enjin.commands[command]['subcommands'][subcommand] && global.enjin.commands[command]['subcommands'][subcommand]['direct']) {
                gulp.task(`${command}:${subcommand}`, require(global.enjin.commands[command]['subcommands'][subcommand]['service'] ? process.cwd() + '/' + global.enjin.commands[command]['subcommands'][subcommand]['service'] : `./${command}/${subcommand}`));
            } else {
                gulp.task(`${command}:${subcommand}`, function(done) {
                    initTask(command, subcommand, done);
                });
            }
        });
    } else {
        if (global.enjin.commands[command]['direct']) {
            gulp.task(command, require(global.enjin.commands[command]['service'] ? process.cwd() + '/' + global.enjin.commands[command]['service'] : `./${command}`));
        } else {
            gulp.task(command, function(done) {
                initTask(command, null, done);
            });
        }
    }
});