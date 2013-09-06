// Sort the methods list
angular.module('ngRegexApp').filter('sortByMethod', function () {
    return function (methods) {

        var orderedMethods = [];
        angular.forEach(methods, function (item) {
            orderedMethods.push(item);
        });

        orderedMethods.sort(function(a, b){
            var a1= a.listSortOrder, b1= b.listSortOrder;
            if(a1== b1) return 0;
            return a1> b1? 1: -1;
        });

        return orderedMethods;
    }
});