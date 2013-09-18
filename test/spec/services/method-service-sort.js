'use strict';

describe('Applying Sortable to the Regex Sections', function () {

    // load the controller's module
    beforeEach(module('ngRegexApp'));

    var methodService,
            scope, dataStore;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, MethodService, Methods, DataStore) {
        scope = $rootScope.$new();
        scope.methods = Methods;
        methodService = MethodService;
        dataStore = DataStore;
        scope.data = DataStore;
    }));

    describe("when reordering the regex sections", function () {

        beforeEach(function(){
            methodService.addSection(dataStore, scope.methods._then, "shane");
            methodService.addSection(dataStore, scope.methods._then, "kittie");
            methodService.addSection(dataStore, scope.methods._maybe, "sally");
        });

        it("Correctly sets the sort order when sections are added", function () {
            expect(scope.data.regexSections[0].sortOrder).toBe(0);
            expect(scope.data.regexSections[1].sortOrder).toBe(1);
            expect(scope.data.regexSections[2].sortOrder).toBe(2);
        });

        describe("reordering with array of indexes", function () {

            var newOrder;

            beforeEach(function(){
                newOrder = [2, 0, 1];
                methodService.reorderSections(dataStore, dataStore.regexSections, newOrder);
            });

            it("can reorder", function () {

                expect(scope.data.regexSections[0].sortOrder).toBe(2);
                expect(scope.data.regexSections[1].sortOrder).toBe(0);
                expect(scope.data.regexSections[2].sortOrder).toBe(1);
            });

            it("can reorder Multiple Times", function () {

                newOrder = [1, 0, 2];
                methodService.reorderSections(dataStore, dataStore.regexSections, newOrder);

                expect(scope.data.regexSections[0].sortOrder).toBe(1);
                expect(scope.data.regexSections[1].sortOrder).toBe(0);
                expect(scope.data.regexSections[2].sortOrder).toBe(2);
            });
        });
    });
});