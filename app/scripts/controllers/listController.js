'use strict';

angular.module('ngRegexApp').controller('ListCtrl', ['$scope', 'MethodService', '$rootScope', 'Methods', 'DataStore', function ($scope, MethodService, $rootScope, Methods, DataStore) {

    $scope.methods = Methods; // Assign the methods to the controller scope.

    $scope.data = DataStore;

    $scope.addSection = function (method, param) {

        MethodService.addSection(DataStore, method, param);
        MethodService.runTest(DataStore, $scope.data.testString);

    };

    $scope.addRangeSection = function (method, param1, param2) {

        MethodService.addSection(DataStore, method, param1, param2);
        MethodService.updateScope($scope, DataStore);

    };

}]);

angular.module('ngRegexApp').controller('AllApp', ['$scope', 'MethodService', '$rootScope', 'Methods', 'DataStore', function ($scope, MethodService, $rootScope, Methods, DataStore) {
//    MethodService.updateScope($rootScope, DataStore);
}]);