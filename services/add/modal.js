const npc      = require('copy-paste');

const renderToFile = require('../renderToFile');


module.exports = function(params, callback) {
    var data = {name: params.name};
    renderToFile(
        `${global.enjin.tmplDir}pug/modal.pug`, 
        data, 
        `${global.enjin.html.srcDir}modal/${params.name}.pug`,
        function(pugFile) {
            renderToFile(
                `${global.enjin.tmplDir}scss/modal.scss`,
                data,
                `${global.enjin.css.srcDir}modal/${params.name}.scss`,
                function(scssFile) {
                    npc.copy(`
                        this.$ionicModal.fromTemplateUrl('html/modal/${params.name}.html', {
                            scope: this.$scope,
                            animation: 'slide-in-up',
                            backdropClickToClose: true
                        }).then((modal) => {
                            this.modal = modal;
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