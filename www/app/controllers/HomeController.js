/**
 * Created by rmatei9 on 05/05/16.
 */
define(['app', 'views/HomeView'], function (app, HomeView) {
    function HomeController($scope) {
        var viewParams = {
            scope: $scope
        };
        var view = HomeController.createView(viewParams);
        view.init();
    }

    HomeController.createView = function (viewParams) {
        return new HomeView(viewParams);
    };

    app.controller('HomeController', ['$scope', HomeController]);
    return HomeController;
});

