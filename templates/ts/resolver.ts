/// <reference path="../../typings/index.d.ts"/>
class <%= name %>Resolver {
    constructor() {
        return {
            <% _.each(resolves, function(resolve, key) { %><%= resolve %>: this.<%= resolve %><%= key === resolves.length - 1 ? '' : ',\n\t\t\t' %><% }); %>
        };
    }<% _.each(resolves, function(resolve) { %>
    
    <%= resolve %>(<%= lazyLoad && resolve === 'lazyLoader' ? '$ocLazyLoad' : '' %>) {
        <% if (lazyLoad && resolve === 'lazyLoader') { %>return $ocLazyLoad.load('<%= lazyLoad %>');<% } else { %>return {};<% } %>
    }<% }); %>
}