var require = {
    baseUrl: 'app',
    paths: {
        angular: '../lib/angular/angular.min',
        angularRouter: '../lib/angular-ui-router/release/angular-ui-router.min',
        angularTranslate: '../lib/angular-translate/angular-translate.min',
        jquery: '../lib/jquery/dist/jquery.min',
        jsog: "../lib/jsog/lib/JSOG"
    },
    shim: {
        angular: {
            deps: ['jquery'],
            exports: "angular"
        },
        angularTranslate: {
            deps: ['angular'],
            exports: "angular-translate"
        },
        angularRouter: {
            deps: ['angular'],
            exports: "angularRouter"
        }
    },
    priority: [
        'jsog',
        'jquery',
        'angular',
        'angularRouter'
    ]
};
