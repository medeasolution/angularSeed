/**
 * Created by rmatei9 on 05/05/16.
 */
define([], function(){
        function HTTPService(){
            this.jquery = $;
        }

        HTTPService.prototype.makeRequest = function(requestObject){
            try{
                var locData = (requestObject.data) ? JSOG.stringify(requestObject.data) : null;
                this.validateRequestObject(requestObject);
                var that = this;
                this.jquery.ajax({
                        dataType: "json",
                        contentType:"application/json",
                        async:true,
                        url: requestObject.url,
                        type: requestObject.type,
                        data: locData
                    })
                    .done(function(response){
                        response = JSOG.decode(response);
                        if(response.success){
                            if(requestObject.saveCache && requestObject.saveCache == true) {
                                that.storeResponseInCache(response.data, requestObject);
                            }
                            requestObject.onSuccess(response.data)
                        }else{
                            requestObject.onError(response.message);
                        }

                    })
                    .fail(function (errorThrown) {
                        if(errorThrown.state()=='rejected')
                            requestObject.onError('Hubo un problema con la conexión al servidor.');
                        else
                            requestObject.onError(errorThrown)
                    })
            }catch (err){
                requestObject.onError(err);
                throw err;
            }
        };

        HTTPService.prototype.validateRequestObject = function (requestObject){
            if (!requestObject.type){
                requestObject.type = 'GET';
            }
            if (!requestObject.url){
                throw new Error('URL nor found on requestObject');
            }
        };


        return HTTPService;

    }
);