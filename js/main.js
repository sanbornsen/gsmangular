angular.module('gsmarena', ['ui.bootstrap-slider'])
    .controller('contentController', ['$scope', '$log', '$http', function ($scope, $log, $http) {

        $scope.sliderOptions = {
            min: 0,
            max: 10,
            step: 1,
            precision: 10,
            orientation: 'horizontal',  // vertical
            handle: 'round', //'square', 'triangle' or 'custom'
            tooltip: 'show', //'hide','always'
            enabled: true,
            naturalarrowkeys: false,
            range: false,
            ngDisabled: false,
            reversed: false,
            tooltipseparator: ':',
            tooltipsplit: false
        };

        $scope.priceOptions = {
            min: 0,
            max: 1000,
            step: 10,
            precision: 2,
        };

        $scope.range = true;

        $scope.model = {
            camera: 0,
            memory: 0,
            ram: 0,
            bat: 0,
            price: 0,
        };

        $scope.value = {
            camera: $scope.sliderOptions.min + $scope.sliderOptions.step,
            memory: $scope.sliderOptions.min + $scope.sliderOptions.step,
            ram: $scope.sliderOptions.min + $scope.sliderOptions.step,
            bat: $scope.sliderOptions.min + $scope.sliderOptions.step,
            price: $scope.sliderOptions.min + $scope.sliderOptions.step,
        };

        $scope.delegateEvent = null;
        $scope.slideDelegate = function (value, event) {
            $scope.items = [];
        };

        $scope.priceSlideDelegate = function(value) {
            $log.log('Price Slide delegate value: ' + value);
            var queryStr = "wc="+$scope.model.camera;
            queryStr += "&wr="+$scope.model.ram;
            queryStr += "&wb="+$scope.model.bat;
            queryStr += "&ws="+$scope.model.memory;
            queryStr += "&price="+$scope.model.price;

            $scope.items = [];
            $scope.sliderOptions.ngDisabled = true;
            $http.get(BASE_URL+"search/?"+queryStr)
            .success(function(response) {
                $scope.sliderOptions.ngDisabled = false;
                $log.log(response);
                $scope.items = response;
            })
        }

    }])
    // Custom filter written for storage number
    .filter("toMemory", function() {
        return function(ramVal) {
            if (ramVal < 1) {
                return (ramVal*1024)+" MB";
            } else {
                return ramVal+" GB";
            }
        }
    })
;