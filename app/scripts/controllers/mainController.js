angular.module('ngRegexApp').controller('MainCtrl',['$scope', "MethodService", "DataStore", function ($scope, MethodService, DataStore) {

    // Add the data to the scope.
    $scope.data = DataStore; // Shared data

    $scope.removeSection = function (index) {
        var sections = MethodService.removeSection(DataStore, index);
        return sections;
    };

    $scope.reset = function () {
        DataStore.testString = "";
        MethodService.reset(DataStore);
    };

    $scope.runTest = function (testString) {

        if (DataStore.regexSections.length) {
            var localData = MethodService.runTest(DataStore, testString);
            return localData;
        }

        return false;
    };
}]);