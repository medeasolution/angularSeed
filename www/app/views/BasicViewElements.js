/**
 * Created by rmatei9 on 05/05/16.
 */
define([], function(){
    function BasicEventsView($scope){
        this.scope = $scope;
        this.scope.events = ($scope.events) ? $scope.events : {};
        this.scope.events.stopPropagation = function(event) { event.stopPropagation();};
        return this;
    }

    BasicEventsView.prototype.setError = function(msg){
        console.error(msg);
        //alert(msg);
    };

    BasicEventsView.prototype.setSuccess = function(msg){
        console.info(msg);
    };

    BasicEventsView.prototype.apply = function(){
        if(this.scope.$$phase != '$digest' && this.scope.$$phase != '$apply') {
            this.scope.$apply();
        }
    };

    return BasicEventsView;
});