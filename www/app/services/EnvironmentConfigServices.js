/**
 * Created by rmatei9 on 05/05/16.
 */
define([], function(){
    function EnvironmentConfigServices(){
        return this;
    }
    EnvironmentConfigServices.prototype.getEnvConfig = function(){
        var hostname = window.location.hostname;
        if(hostname.indexOf("localhost")!=-1 || hostname.indexOf("-dev.")!=-1){
            return this.getDevConfig();
        }else{
            return this.getProdConfig();
        }
    };

    EnvironmentConfigServices.prototype.getDevConfig = function(){
        return {
            javaAPIEndPoint: 'http://localhost:9000'
        };
    };

    EnvironmentConfigServices.prototype.getProdConfig = function(){
        return {
            javaAPIEndPoint: 'http://serverURL:9000'
        };
    };

    return EnvironmentConfigServices;
});
