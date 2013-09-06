describe("Controller: MainCtrl", function () {

    beforeEach(module('ngRegexApp'));

    var MainCtrl, scope, data, methodService, methods, dataStore;

    beforeEach(inject(function ($controller, $rootScope, MethodService, DataStore, Methods) {
        methodService = MethodService;
        methods = Methods;
        dataStore = DataStore;

        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });

    }));

    it('should load the controller', function () {
        expect(MainCtrl).toBeDefined();
    });


    it('should be initialized with access to regexsections', function () {
        expect(scope.data.regexSections.length).toBe(0);
    });

    it('should have access to a regex section when it is added', function () {
        methodService.addSection(dataStore, methods._then, "shane");
        expect(scope.data.regexSections.length).toBe(1);
    });

    it('should have access to updated regexsections after a section is added or removed', function () {
        methodService.addSection(dataStore, methods._then, "shane");
        expect(scope.data.regexSections.length).toBe(1);

        methodService.addSection(dataStore, methods._then, "shane");
        expect(scope.data.regexSections.length).toBe(2);

        methodService.removeSection(dataStore, 0);
        expect(scope.data.regexSections.length).toBe(1);
    });

    it('should remove sections when the removeSection method is called', function () {
        methodService.addSection(dataStore, methods._then, "shane");

        var localScope = scope.removeSection(0);

        expect(localScope.regexSections.length).toBe(0);
        expect(localScope.regex).toBe('var tester = new RegExp();');
    });

    it('should remove all section when reset method is called', function () {
        methodService.addSection(dataStore, methods._then, "shane");
        scope.reset();
        expect(scope.data.regexSections.length).toBe(0);
    });

    it('should wipe the testString when reset is called (i.e clear the input field)', function () {
        methodService.addSection(dataStore, methods._then, "shane");
        dataStore.testString = "hello";
        scope.reset();
        expect(scope.data.testString).toBe("");
    });

    describe('Shorthand Regex Section', function () {

        it('should be defined upin init', function () {
            expect(scope.data.shorthandRegex).toBeDefined();
        });

        it('should have the correct value after a section is added', function () {
            methodService.addSection(dataStore, methods._then, "shane");
            expect(scope.data.shorthandRegex).toBe("/(?:shane)/gm");
        });

        it('should not escape double quotes', function () {
            methodService.addSection(dataStore, methods._then, '"');
            expect(scope.data.shorthandRegex).toBe('/(?:")/gm');
        });

        it("should be reset when the reset method is called", function () {
            methodService.addSection(dataStore, methods._then, '"');
            methodService.reset(dataStore);
            expect(scope.data.shorthandRegex).toBe('');
        });

    });


//    iit('should empty any error messages when the rest method is called', function () {
//        methodService.addSection(dataStore, methods._range, "1", "0");
//        var rootScope = scope.reset();
//        expect(scope.errorMessage).toBe('');
//    });

    it('should have the default test code upon init', function () {
        expect(scope.data.regexTestCode).toBe("tester.test();");
    });
    it('should have the correct test code when a section is added', function () {
        methodService.addSection(dataStore, methods._range, "0", "1");
        scope.runTest('1');
        expect(scope.data.regexTestCode).toBe('tester.test("1");');
    });
    it('empty the test code when the reset method is called', function () {
        methodService.addSection(dataStore, methods._then, "shane");
        scope.runTest("shane");
        scope.reset();
        expect(scope.data.regexTestCode).toBe('tester.test();');
    });
});
