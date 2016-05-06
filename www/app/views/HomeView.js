/**
 * Created by eric on 05/05/16.
 */
define(['views/BasicViewElements', 'presenters/HomePresenter'],
    function (BasicViewElements, HomePresenter) {
        function HomeView(viewParams) {
            BasicViewElements.call(this, viewParams.scope);
            var that = this;

            this.scope.events = {
                onClickButton1: function(){ that.clickButton1();}
            };

            this.scope.clicks = 0;
            new HomePresenter(this);
            return this;
        }

        HomeView.prototype = Object.create(BasicViewElements.prototype);

        HomeView.prototype.init = function () {
            this.getInfo();
        };

        HomeView.prototype.setInfo = function (response) {
            alert(response);
        };

        HomeView.prototype.clickButton1 = function () {
            this.scope.clicks++;
        };

        return HomeView;
    }
);
