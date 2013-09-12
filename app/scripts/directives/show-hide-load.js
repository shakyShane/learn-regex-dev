angular.module('ngRegexApp').directive('showOnLoad', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            window.setTimeout(function () {
                element.removeClass("hidden");
            }, 2000);
        }
    }
}]);

angular.module('ngRegexApp').directive('hideOnLoad', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            window.setTimeout(function () {
                element.remove();
            }, 2000);
        }
    }
}]);