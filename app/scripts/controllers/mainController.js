angular.module('ngRegexApp').controller('MainCtrl', function ($scope, $rootScope, MethodService, DataStore) {

    // Add the data to the scope.
    $scope.data = DataStore; // Shared data

    $scope.removeSection = function (index) {
        var sections = MethodService.removeSection(DataStore, index);
//        $scope.runTest($scope.testString);
        return sections;
    };
//
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

//    $scope.runReplaceString = function (testString, replaceString) {
//        if ($scope.result) {
//            var replaceCode = '"' + testString + '"' + '.replace(' + $rootScope.regex + ', "' + replaceString + '")';
//            $scope.replace = eval(replaceCode);
//            $scope.replaceCode = replaceCode;
//            $scope.replaceResult = eval(replaceCode);
//        }
//    }
});

angular.module('ngRegexApp').controller('DraggleCtrl', function ($scope, $rootScope, MethodService, DataStore) {

    $scope.data = DataStore;

    var updateSortOrder = function () {

        $scope.$apply(function () {
            var order = [];
            $sortable.find('li').each(function (i, item) {
                var order = $(this).data('id');
                angular.forEach($scope.data.regexSections, function (item) {
                    if (item.$$hashKey === order) {
                        item.sortOrder = i;
                    }
                });
            });

            DataStore.js_code = MethodService.renderJsCode($scope.data.regexSections);
            DataStore.regex = MethodService.renderRegexCode($scope, DataStore.js_code);
            MethodService.runTest(DataStore, DataStore.testString);
        });

    };

    var $sortable = $(".sortable");
    $scope.$on('addSortable', function () {
        $sortable.sortable('destroy');
        $sortable.off('sortupdate');
        $sortable.sortable().bind('sortupdate', updateSortOrder);
    });
});


angular.module('ngRegexApp').directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit(attr.onFinishRender);
                });
            }
        }
    }
});