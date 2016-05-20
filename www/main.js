require.config({
    baseUrl: 'app',
    paths: {
        angular: '../lib/angular/angular.min',
        angularRouter: '../lib/angular-ui-router/release/angular-ui-router.min',
        angularTranslate: '../lib/angular-translate/angular-translate.min',
        jquery: '../lib/jquery/dist/jquery.min',
        jsog: "../lib/jsog/lib/JSOG",
        bootstrap: '../lib/bootstrap-sass/assets/javascripts/bootstrap.min'
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
        },
        bootstrap: {
            deps:['jquery']
        }
    },
    priority: [
        'jsog',
        'jquery',
        'bootstrap',
        'angular',
        'angularRouter'
    ]
});
