'use strict';

describe('Service: Running tests', function () {

    // load the controller's module
    beforeEach(module('ngRegexApp'));

    var methodService,
            scope, methods;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, MethodService, Methods) {
        scope = $rootScope.$new();
        methods = scope.methods = Methods;
        methodService = MethodService;
        scope.js_code = methodService.initJs();
        scope.regex = methodService.initRegex();
        scope.regexSections = [];
    }));

    // Start of string
    it("should run a test with start of String", function () {
        methodService.addSection(scope, methods._then, "shane");
        methodService.addSection(scope, methods._startOfLine, "");
        var test = methodService.runTest(scope, "shane");
        expect(test).toBe(true);
        test = methodService.runTest(scope, "dshane");
        expect(test).toBe(false);
    });

    // End of string
    it("should run a test with End of a string", function () {
        methodService.addSection(scope, methods._then, "shane");
        methodService.addSection(scope, methods._endOfLine, "");
        var test = methodService.runTest(scope, "ranomc./wdshane");
        expect(test).toBe(true);
        test = methodService.runTest(scope, "ranshaneomc./wd");
        expect(test).toBe(false);
    });

    // With any case
    it("should run a test with End of a string", function () {
        methodService.addSection(scope, methods._then, "shane");
        var test = methodService.runTest(scope, "SHANE");
        expect(test).toBe(false);

        methodService.addSection(scope, methods._withAnyCase, "");
        test = methodService.runTest(scope, "SHANE");
        expect(test).toBe(true);
    });

    // then
    it("should run a test with multiple THEN blocks", function () {
        methodService.addSection(scope, methods._then, "shane ");
        methodService.addSection(scope, methods._then, "is ");
        methodService.addSection(scope, methods._then, "awesome");
        var test = methodService.runTest(scope, "shane is awesome");
        expect(test).toBe(true);
    });

    // maybe
    it("should run a test with MAYBE stuck inbetween other things", function () {
        methodService.addSection(scope, methods._then, "http");
        methodService.addSection(scope, methods._maybe, "s");
        methodService.addSection(scope, methods._then, "://");
        var test = methodService.runTest(scope, "https://github.com/timdouglas/grunt-cache-breaker");
        expect(test).toBe(true);
        test = methodService.runTest(scope, "http://github.com/timdouglas/grunt-cache-breaker");
        expect(test).toBe(true);
        test = methodService.runTest(scope, "ftp://github.com/timdouglas/grunt-cache-breaker");
        expect(test).toBe(false);
    });


    // any of
    it("should run a test with multiple THEN blocks", function () {
        methodService.addSection(scope, methods._then, "shane");
        methodService.addSection(scope, methods._anyOf, " -");
        methodService.addSection(scope, methods._then, "osbourne");
        var test = methodService.runTest(scope, "Shane Osbourne");
        expect(test).toBe(false);
        methodService.addSection(scope, methods._withAnyCase);
        test = methodService.runTest(scope, "Shane Osbourne");
        expect(test).toBe(true);
    });

    // range
    it("should run a test with the Range input using numbers", function () {
        methodService.addSection(scope, methods._range, "0", "1");
        var test = methodService.runTest(scope, "1");
        expect(test).toBe(true);
        test = methodService.runTest(scope, "0");
        expect(test).toBe(true);
        test = methodService.runTest(scope, "2");
        expect(test).toBe(false);
    });

    // range
    it("should run a test with the Range input using letters", function () {
        methodService.addSection(scope, methods._range, "a", "d");
        var test = methodService.runTest(scope, "a");
        expect(test).toBe(true);
        test = methodService.runTest(scope, "e");
        expect(test).toBe(false);
    });

    // Or
    it("should run a test with the OR block", function () {
        methodService.addSection(scope, methods._then, "a");
        methodService.addSection(scope, methods._or);
        methodService.addSection(scope, methods._then, "b");
        var test = methodService.runTest(scope, "a");
        expect(test).toBe(true);
        test = methodService.runTest(scope, "e");
        expect(test).toBe(false);
    });

    // Anything
    it("should always return true for the ANYTHING block", function () {
        methodService.addSection(scope, methods._anything);
        var test = methodService.runTest(scope, "1");
        expect(test).toBe(true);
        test = methodService.runTest(scope, "0");
        expect(test).toBe(true);
        test = methodService.runTest(scope, "07899rfwerqnweflkjqnef");
        expect(test).toBe(true);
    });

    it("should always return false if nothing is provided for the test & the anything block is used", function () {
        methodService.addSection(scope, methods._anything);
        var test = methodService.runTest(scope, "");
        expect(test).toBe(false);
    });

    it("should run a test with the ANYTHING block stuck anywhere", function () {
        methodService.addSection(scope, methods._then, "a");
        methodService.addSection(scope, methods._anything);
        methodService.addSection(scope, methods._then, "b");

        var test = methodService.runTest(scope, "a");
        expect(test).toBe(false);

        test = methodService.runTest(scope, "aanythingthiasb");
        expect(test).toBe(true);
    });

    //Word
    it("should run tests when the WORD block is used", function () {
        methodService.addSection(scope, methods._then, "a");
        methodService.addSection(scope, methods._word);
        methodService.addSection(scope, methods._then, "b");

        var test = methodService.runTest(scope, "ab");
        expect(test).toBe(false);

        test = methodService.runTest(scope, "a9b");
        expect(test).toBe(true);

        test = methodService.runTest(scope, "a-b");
        expect(test).toBe(false);

        test = methodService.runTest(scope, "a]b");
        expect(test).toBe(false);
    });
});