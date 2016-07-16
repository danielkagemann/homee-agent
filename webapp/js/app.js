/****************************************************************************************************************
 * required modules
 ****************************************************************************************************************/
angular.module('had', ['ngAnimate']);

/****************************************************************************************************************
 * controller
 ****************************************************************************************************************/
angular.module('had').controller('mainCtrl', function ($scope, $http, $interval){

        var vm = this, $handle = null, $checkEvery = 5, $checkIndex = 0;
        vm.progress = 0;

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
        }, 1000);

    }
);

/****************************************************************************************************************
 * filter: not yet
 ****************************************************************************************************************/

/****************************************************************************************************************
 * directive(s): not yet
 ****************************************************************************************************************/
