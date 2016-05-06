/**
 * Created by rmatei9 on 05/05/16.
 */
define(['services/EnvironmentConfigServices', 'services/HTTPService'], 
    function(EnvironmentConfigServices, HTTPService){

        function UserModel(){
            var environment = new EnvironmentConfigServices();
            this.baseUrl = environment.getEnvConfig().javaAPIEndPoint + '/api/Test/';
            this.httpService = new HTTPService();
            return this;
        }
    
        UserModel.prototype.getInfo = function (request) {
            request.type='PUT';
            request.url = this.baseUrl + 'login';
            this.httpService.makeRequest(request);
        };
        
        return UserModel;
    }
);