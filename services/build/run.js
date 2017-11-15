const sequence = require('../sequence');
const htmlCompile = require('../html/compile');
const htmlInject = require('../html/inject');

module.exports = function (name, tasks, callback) {
    if (!global.runningTasks) {
        global.runningTasks = {};
    }

    var runningAgain = false;

    if (global.runningTasks[name]) {
        runningAgain = true;
        console.log(`${name} task has been queued up again`);
    } else {
        global.runningTasks[name] = tasks.length;
    }

    //console.log(JSON.stringify(global.runningTasks));

    sequence(tasks, () => {
        if (!runningAgain) {
            delete global.runningTasks[name];
            console.log(`Done doing ${name}`);
        }

        if (Object.keys(global.runningTasks).length === 0 && global.synced) {
            if (global.injectHtml) {
                console.log('Ima doing it!');
                htmlCompile(() => {
                    htmlInject(() => {
                        global.injectHtml = false;
                        global.browserSync.reload();
                    });
                });
            } else {
                global.browserSync.reload();
            }
        }
        if (callback && typeof callback === 'function') {
            callback();
        }
    });
};