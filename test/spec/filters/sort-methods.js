describe("Custom Filters: sort Methods", function () {

    beforeEach(module('ngRegexApp'));

    describe('sort Methods', function () {
        it('should accept an object and return an array, sorted by the sortOrder property on the objects', inject(function (Methods, sortByMethodFilter) {
            var sorted = sortByMethodFilter(Methods);
            expect(angular.isArray(sorted)).toBe(true);
            expect(sorted[0].method).toBe('then');
            expect(sorted[1].method).toBe('maybe');
        }));
    });

});