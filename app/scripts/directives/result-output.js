angular.module('ngRegexApp').directive('resultOutput', function ($rootScope) {
    return {
        restrict: "A",
        link: function (scope, element, attr) {
            scope.$watch('data.result', function (value) {
                if(value && value === true) {
                    element.removeClass("icon-thumbs-up-2")
                    return element.addClass("icon-thumbs-up")
                }
                if (value === false) {
                    element.removeClass("icon-thumbs-up")
                    return element.addClass("icon-thumbs-up-2")
                }
                if (value === "n/a") {
                    element.removeClass("icon-thumbs-up")
                    element.removeClass("icon-thumbs-up-2")
                }
            });
        }
    }
});