angular.module('ngRegexApp').directive('showMenu', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.on("click", function (evt) {
                $("#method-list").toggleClass("active");
                element.toggleClass("active");
            });
        }
    }
}]);