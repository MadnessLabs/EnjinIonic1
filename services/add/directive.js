const renderToFile = require('../../services/renderToFile');
const npc = require('copy-paste');

module.exports = function(params, callback) {
    
    var attrsJson = {};
    var attrProps = [];
    var attrName; 
    var attrBinding = '=';

    params.restrict = !params.restrict ? "'EA'": "'" + params.restrict + "'";
    params.templatePath = !params.templatePath ? '' : `\n\t\ttemplateUrl: 'html/directive/${params.name}.html', \t\t`;

    if (params.attrs) {
        if (params.attrs.indexOf(',') > 0) {
            params.attrs = params.attrs.split(',');
            for(var i = 0; i < params.attrs.length; i++) {
                attrBinding = '=';
                var attr = params.attrs[i];
                attrName = attr;

                if (attr.indexOf(':') > 0) {
                    var attrSplit = attr.split(':');
                    attrName = attrSplit[0];
                    attrBinding = attrSplit[1];
                }

                attrsJson[attrName] = attrBinding;
                attrProps.push(`${attrName.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()}="''"`);
            }
        } else {
            attrName = param.attrs;
            if (params.attrs.indexOf(':') > 0) {
                var attrSplit = attr.split('=');
                attrName = attrSplit[0];
                attrBinding = attrSplit[1];
            }

            attrsJson[attrName] = attrBinding;
            attrProps.push(`${attrName.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()}="''"`);
        }

        var attrsJsonString = JSON.stringify(attrsJson);

        var copyText = `${params.name.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()}(\n\t${attrProps.join('\n\t')}\n)`;

        npc.copy(copyText);
    } else {
        attrsJsonString = '{}';
    }

    renderToFile(
        `${global.enjin.tmplDir}ts/directive.ts`,
        {
            app: global.enjin.name,
            name: params.name,
            attrs: attrsJsonString.replace(/"/g, "'").replace(/,/g, `,\n\t\t\t`).replace("{'", "{\n\t\t\t'").replace("'}", "'\n\t\t}"),
            template: params.templatePath,
            restrict: params.restrict
        },
        `${global.enjin.js.srcDir}directive/${params.name}.ts`,
        function(file) {
            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    );
};
