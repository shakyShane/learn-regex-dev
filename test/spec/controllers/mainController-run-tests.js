describe("Controller: Run tests through MainCtrl", function () {

    beforeEach(module('ngRegexApp'));

    var MainCtrl, scope, methodService, methods, dataStore;

    beforeEach(inject(function ($controller, $rootScope, MethodService, Methods, DataStore) {
        methodService = MethodService;
        methods = Methods;
        dataStore = DataStore;
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));

    it('should run a test', function () {
        methodService.addSection(dataStore, methods._then, "shane");
        var testResult = scope.runTest("shane");
        expect(testResult).toBe(true);
    });

    it('should run a test', function () {
        methodService.addSection(dataStore, methods._startOfLine, "");
        methodService.addSection(dataStore, methods._then, "shane");
        var testResult = scope.runTest("dshane");
        expect(testResult).toBe(false);
    });


    /**
     *
     *
     * Double Quote stuff
     *
     *
     */
    it('should run a test including a double quote', function () {
        methodService.addSection(dataStore, methods._startOfLine, '');
        methodService.addSection(dataStore, methods._then, '"');
        var testResult = scope.runTest('"');
        expect(testResult).toBe(true);
    });

    it('should run a test including a double quote after something else', function () {
        methodService.addSection(dataStore, methods._then, 'shane');
        methodService.addSection(dataStore, methods._then, '"');
        var testResult = scope.runTest('shane"');
        expect(testResult).toBe(true);
    });
    it('should run a test including a double quote in the middle of a string', function () {
        methodService.addSection(dataStore, methods._then, 'shane"ohno');
        var testResult = scope.runTest('shane"ohno');
        expect(testResult).toBe(true);
    });
});
