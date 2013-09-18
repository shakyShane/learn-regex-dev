angular.module('ngRegexApp').controller('DraggleCtrl', function ($scope, $rootScope, MethodService, DataStore) {

    $scope.data = DataStore;
    var $sortable = jQuery(".sortable");

    var updateSortOrder = function () {

        var newOrder = [];
        $scope.$apply(function () {

            var newOrder = MethodService.extractOrderFromDom($sortable.find('li'), DataStore);

            // _todo Add controller test to ensure all of this happens on a re-order
            MethodService.reorderSections(DataStore, DataStore.regexSections, newOrder);
            MethodService.updateUi(DataStore);
            MethodService.runTest(DataStore, DataStore.testString);

        });
    };

    $scope.$on('addSortable', function () {
        $sortable.sortable('destroy');
        $sortable.off('sortupdate');
        $sortable.sortable().bind('sortupdate', updateSortOrder);
    });
});
