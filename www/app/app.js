// The main app definition
// --> where you should load other module depdendencies
define([
    'angular',
    'angularRouter',
    'angularTranslate',
    'jsog',
    'bootstrap',
    'translates/EsTranslate'],
    function (angular) {
        'use strict';
        return angular.module('app', ['ui.router', 'pascalprecht.translate', 'EsTranslate']);
    }
);
