angular.module('ngRegexApp').controller('DraggleCtrl', function ($scope, $rootScope, MethodService, DataStore) {

    $scope.data = DataStore;
    var $sortable = jQuery(".sortable");

    var updateSortOrder = function () {

        $scope.$apply(function () {
            var order = [];
            $sortable.find('li').each(function (i, item) {
                var order = jQuery(this).attr('rel');
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

    $scope.$on('addSortable', function () {
        $sortable.sortable('destroy');
        $sortable.off('sortupdate');
        $sortable.sortable().bind('sortupdate', updateSortOrder);
    });
});
