'use strict';

describe('Methods service to Shorthand Regex: ', function () {

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

    describe("the shorthand regex code", function () {

        it('can be initialized with the Starter code.', function () {
            expect(dataStore.sh_regex).toBe("//gm");
        });

        describe("when adding sections", function () {
            it("can add THEN sections", function () {
                methodService.addSection(dataStore, scope.methods._then, "shane");
                expect(dataStore.sh_regex).toBe("/(?:shane)/gm");
            });
            it("can add SPACE sections", function () {
                methodService.addSection(dataStore, scope.methods._space);
                expect(dataStore.sh_regex).toBe("/(?: )/gm");
            });
        });

        describe("when displaying characters that should be escaped", function () {

            it("should be able to add dots", function () {
                methodService.addSection(dataStore, scope.methods._then, ".");
                expect(dataStore.sh_regex).toBe("/(?:\\.)/gm");
            });
            it("should be able to add ?", function () {
                methodService.addSection(dataStore, scope.methods._then, "?");
                expect(dataStore.sh_regex).toBe("/(?:\\?)/gm");
            });
            it("should be able to add *", function () {
                methodService.addSection(dataStore, scope.methods._then, "*");
                expect(dataStore.sh_regex).toBe("/(?:\\*)/gm");
            });
            it("should be able to add *", function () {
                methodService.addSection(dataStore, scope.methods._then, "*");
                expect(dataStore.sh_regex).toBe("/(?:\\*)/gm");
            });
        });
    });

    describe("the shorthand regex code with the test string", function () {

        it("should be initialised with the starter code.", function () {
            expect(dataStore.sh_regex_code).toBe('//gm.test("")');
        });

        describe("when updating the test string", function () {


            it("should update when a THEN sectioned added", function () {
                methodService.addSection(dataStore, scope.methods._then, "*");
                expect(dataStore.sh_regex_code).toBe('/(?:\\*)/gm.test("")');
            });

            it("should update when THEN sections are added", function () {

                methodService.addSection(dataStore, scope.methods._then, "*");
                methodService.addSection(dataStore, scope.methods._then, "kittie");
                methodService.runTest(dataStore, '*"kittie');
                expect(dataStore.sh_regex_code).toBe('/(?:\\*)(?:kittie)/gm.test("*\\"kittie")');
            });
        });
        describe("when resetting", function () {
            it("should return to it's default state when the reset method is called", function () {

                methodService.addSection(dataStore, scope.methods._then, "*");
                methodService.runTest(dataStore, '*"kittie');
                methodService.reset(dataStore);
                expect(dataStore.sh_regex_code).toBe('//gm.test("")');
            });
            it("should return to default if an empty test string was provided", function () {

                methodService.addSection(dataStore, scope.methods._then, "*");
                methodService.runTest(dataStore, 'shane');
                expect(dataStore.sh_regex_code).toBe('/(?:\\*)/gm.test("shane")');

                methodService.runTest(dataStore, '');
                expect(dataStore.sh_regex_code).toBe('/(?:\\*)/gm.test("")');
            });
        });
    });
});