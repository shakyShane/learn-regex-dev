describe("Controller: ListCtrl", function () {

    beforeEach(module('ngRegexApp'));

    var ListCtrl, scope;

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ListCtrl = $controller('ListCtrl', {
            $scope: scope
        });
    }));

    it('should load the controller', function () {
        expect(ListCtrl).toBeDefined();
    });

    it('should have access to the methods', function () {
        expect(scope.methods).toBeDefined();
        expect(scope.methods._then).toBeDefined();
    });

    it("should have the addSection and addRangeSection methods", function () {
        expect(scope.addSection).toBeDefined();
        expect(scope.addRangeSection).toBeDefined();
    });

    it("should add sections", function () {
        scope.addSection(scope.methods._then, "shane");
        expect(scope.data.regexSections.length).toBe(1);
        scope.addSection(scope.methods._then, "kittie");
        expect(scope.data.regexSections.length).toBe(2);
        expect(scope.data.js_code).toBe('VerEx().then("shane").then("kittie")');
    });

    it("should add Range Sections", function () { // Todo - Find out why this test is failing now that we've switched to an external data-store
        scope.addRangeSection(scope.methods._range, "1", "2");
        expect(scope.data.regexSections.length).toBe(1);
        expect(scope.data.js_code).toBe('VerEx().range("1", "2")');
    });

});
