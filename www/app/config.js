define(
    [
        'app'
    ],
    function (app) {
        'use strict';
        // additional config-blocks
        app.config(['$translateProvider',
            function ($translateProvider) {
                $translateProvider.preferredLanguage('es');
                $translateProvider.useSanitizeValueStrategy('escape');
            }
        ]);
    });
