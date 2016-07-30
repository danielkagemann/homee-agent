/****************************************************************************************************************
 * filter
 ****************************************************************************************************************/
angular.module('had')
    .filter('windowStatus', function (){
        return function (list, arg){
            var count = 0;
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