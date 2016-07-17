/****************************************************************************************************************
 * required modules
 ****************************************************************************************************************/
angular.module('had', ['ngAnimate', 'FBAngular']);

/****************************************************************************************************************
 * controller
 ****************************************************************************************************************/
angular.module('had').controller('mainCtrl', function ($scope, $http, $interval, Fullscreen){

        var vm = this, $handle = null, $checkEvery = 5, $checkIndex = 0;
        vm.progress = 0;
        vm.data = {window: {}, plug: []};
        vm.clock = {date: "", time: ""};

        /**
         * helper function for updating data
         */
        function $render(){
            $http.get('info').then(function (response){
                vm.data = response.data;
            });
        }

        /**
         * on destroy of controller -> cleanup
         */
        $scope.$on("destroy", function (){
            $interval.cancel($handle);
        });

        // create interal
        $handle = $interval(function (){
            $checkIndex++;
            vm.progress = ($checkIndex * 100) / $checkEvery;

            if ($checkIndex === $checkEvery) {
                $render();
                $checkIndex = 0;
            }

            // update timer
            var now = new Date();
            var ts = now.toLocaleTimeString().substr(0, 5);
            if (ts !== vm.clock.time) {
                vm.clock.date = now.toLocaleDateString();
                vm.clock.time = ts;
            }
        }, 1000);

        /**
         * go into fullscreen mode
         */
        vm.fullscreen = function (){
            Fullscreen.all();
        };
    }
);

/****************************************************************************************************************
 * filter
 ****************************************************************************************************************/
angular.module('had')
    .filter('windowStatus', function (){
        return function (list, arg){
            var count = 0;
            arg = arg || false;
            for (var key in list) {
                if (list.hasOwnProperty(key)) {
                    if (list[key] === arg) {
                        count++;
                    }
                }
            }
            return count;
        }
    })
    .filter('windowLabel', function (){
        return function (list, arg){
            var label = "";
            arg = arg || false;
            for (var key in list) {
                if (list.hasOwnProperty(key)) {
                    if (list[key] === arg) {
                        if (label.length > 0) {
                            label = ", ";
                        }
                        label += key;
                    }
                }
            }
            return label;
        }
    })
    .filter('plugStatus', function (){
        return function (val){
            if (val) {
                return "Läuft";
            }
            return "Gestoppt";
        }
    });

/****************************************************************************************************************
 * directive(s): not yet
 ****************************************************************************************************************/
