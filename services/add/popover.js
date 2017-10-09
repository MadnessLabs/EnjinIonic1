const npc = require('copy-paste');

const renderToFile = require('../renderToFile');


module.exports = function(params, callback) {
    var data = {name: params.name};
    renderToFile(
        `${global.enjin.tmplDir}pug/popover.pug`, 
        data, 
        `${global.enjin.html.srcDir}popover/${params.name}.pug`,
        function(pugFile) {
            renderToFile(
                `${global.enjin.tmplDir}scss/popover.scss`,
                data,
                `${global.enjin.css.srcDir}popover/${params.name}.scss`,
                function(scssFile) {
                    npc.copy(`
                        this.$ionicPopover.fromTemplateUrl('html/popover/${params.name}.html', {
                            scope: this.$scope,
                            animation: 'slide-in-up',
                            backdropClickToClose: true
                        }).then((popover) => {
                            this.popover = popover;
                        });
                    `);
                    if (callback && typeof callback === 'function') {
                        callback();
                    }
                }
            );
        }
    );
};