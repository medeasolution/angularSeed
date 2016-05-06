/**
 * Created by rmatei9 on 05/05/16.
 */
define(['models/TestModel'], function(UserModel){
    function HomePresenter(view){
        var that = this;
        this.userModel = new UserModel();
        
        view.getInfo = function(){
            that.userModel.getInfo({
                onSuccess: view.setInfo.bind(view),
                onError: view.setError.bind(view),
                onComplete: view.apply.bind(view)
            });
        };

        return this;
    }

    return HomePresenter;
});

