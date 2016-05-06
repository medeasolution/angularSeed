define(['angular'], function (angular) {
    angular.module('EsTranslate', ['pascalprecht.translate'], ['$translateProvider', function ($translateProvider) {
        $translateProvider.translations('es', {
            clickMe: 'Pulsame'
        });
    }]);
});
