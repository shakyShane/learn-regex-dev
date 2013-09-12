'use strict';

describe('Service: Methods functionality', function () {

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

    it('is defined', function () {
        expect(methodService).toBeDefined();
        expect(scope.methods).toBeDefined();
    });
    it('can be initialized with the Starter code.', function () {
        expect(scope.data.js_code).toBe("VerEx()");
    });

    describe("when working with regex sections", function () {

        it('should add a regex section', function () {

            methodService.addSection(dataStore, scope.methods._startOfLine, "");
            expect(scope.data.js_code).toBeDefined();
            expect(scope.data.js_code).toBe("VerEx().startOfLine()");
            expect(scope.data.regex).toBe('var tester = new RegExp("^", "gm");');
        });

        it('should add multiple regex sections', function () {

            methodService.addSection(dataStore, scope.methods._then, "one");
            methodService.addSection(dataStore, scope.methods._then, "two");
            methodService.addSection(dataStore, scope.methods._maybe, "s");
            expect(scope.data.js_code).toBe('VerEx().then("one").then("two").maybe("s")');
            expect(scope.data.regex).toBe('var tester = new RegExp("(?:one)(?:two)(?:s)?", "gm");');
        });

        it('should add multiple regex sections & remove any from middle', function () {

            methodService.addSection(dataStore, scope.methods._then, "one");
            methodService.addSection(dataStore, scope.methods._then, "two");
            methodService.addSection(dataStore, scope.methods._maybe, "s");
            methodService.removeSection(dataStore, 0);
            expect(scope.data.js_code).toBe('VerEx().then("two").maybe("s")');
            expect(scope.data.regex).toBe('var tester = new RegExp("(?:two)(?:s)?", "gm");');
        });

        it('should add multiple regex sections & remove any from the END', function () {

            methodService.addSection(dataStore, scope.methods._then, "test1");
            methodService.addSection(dataStore, scope.methods._then, "test2");
            methodService.addSection(dataStore, scope.methods._maybe, "hello");
            methodService.removeSection(dataStore, 2);
            expect(scope.data.js_code).toBe('VerEx().then("test1").then("test2")');
        });

        it('should add Modifiers', function () {

            methodService.addSection(dataStore, scope.methods._startOfLine, "");
            methodService.addSection(dataStore, scope.methods._withAnyCase, "");
            expect(scope.data.js_code).toBe("VerEx().startOfLine().withAnyCase()");
            expect(scope.data.regex).toBe('var tester = new RegExp("^", "gim");');
            expect(scope.data.regexSections.length).toBe(2);
        });

        it("should remove modifiers", function () {

            methodService.addSection(dataStore, scope.methods._startOfLine, "");
            methodService.addSection(dataStore, scope.methods._withAnyCase, "");
            methodService.removeSection(dataStore, 1);
            expect(scope.data.regexSections.length).toBe(1);
            expect(scope.data.regex).toBe('var tester = new RegExp("^", "gm");');
        });

        it("should be able to remove all sections one by one and reset when there are none left.", function () {

            methodService.addSection(dataStore, scope.methods._then, "test1");
            methodService.addSection(dataStore, scope.methods._then, "test2");
            methodService.addSection(dataStore, scope.methods._maybe, "hello");
            methodService.removeSection(dataStore, 2);
            methodService.removeSection(dataStore, 1);
            methodService.removeSection(dataStore, 0);
            expect(scope.data.js_code).toBe("VerEx()");
            expect(scope.data.regexSections.length).toBe(0);
            expect(scope.data.regex).toBe('var tester = new RegExp();');
        });

        it("should not allow more than one section with a type of 'modifier' & the same name ", function () {

            methodService.addSection(dataStore, scope.methods._startOfLine, "");
            methodService.addSection(dataStore, scope.methods._startOfLine, "");
            expect(scope.data.regexSections.length).toBe(1);
        });

        it("should not allow more than one section with a type of 'modifier' & the same name ", function () {

            methodService.addSection(dataStore, scope.methods._startOfLine, "");
            methodService.addSection(dataStore, scope.methods._endOfLine, "");
            expect(scope.data.regexSections.length).toBe(2);
        });
    });

    describe("when resetting", function () {

        it("should be able to reset regex & JS (and anything else) to defaults", function () {

            methodService.addSection(dataStore, scope.methods._startOfLine, "");
            methodService.addSection(dataStore, scope.methods._then, "test1");
            methodService.addSection(dataStore, scope.methods._withAnyCase, "");

            methodService.reset(dataStore);

            expect(scope.data.regexSections.length).toBe(0);
            expect(scope.data.js_code).toBe("VerEx()");
            expect(scope.data.regex).toBe('var tester = new RegExp();');
            expect(scope.data.testString).toBe('');

        });

        it('should be able to reset the testcode & result when an empty string is provided as the test string', function () {

            methodService.addTestString(dataStore, "1");
            methodService.runTest(dataStore, "");
            expect(dataStore.regexTestCode).toBe('tester.test();');
        });

        it('should reset the result param when an empty string is provided as the test string', function () {

            methodService.addTestString(dataStore, "1");
            methodService.runTest(dataStore, "1");
            methodService.runTest(dataStore, "");
            expect(scope.data.result).toBe("n/a");

        });
    });

    describe("when handling errors", function () {

        it("should not add a range regex section if it throws an error", function () {

            methodService.addSection(dataStore, scope.methods._range, "1", "0");
            expect(scope.data.regexSections.length).toBe(0);
            expect(scope.data.js_code).toBe("VerEx()");
            expect(scope.data.regex).toBe('var tester = new RegExp();');
            expect(scope.data.errorMessage).toBeDefined();
        });

        it('should wipe the error message after a new section was successfully added', function () {

            methodService.addSection(dataStore, scope.methods._range, "1", "0"); // bad
            expect(scope.data.errorMessage).toBeDefined();

            methodService.addSection(dataStore, scope.methods._range, "0", "1"); // good
            expect(scope.data.regexSections.length).toBe(1);
            expect(scope.data.errorMessage).toBe("");
        });
    });

    describe("when escaping characters", function () {

        it('should correctly test for a double quote', function () {

            methodService.addSection(dataStore, scope.methods._then, '"'); // Double Quote
            expect(scope.data.regexSections.length).toBe(1);
            expect(scope.data.regex).toBe('var tester = new RegExp("(?:\\")", "gm");');
        });
    });

    describe("when setting the result", function () {

        it('should set the result when a test is (TRUE)', function () {

            methodService.addSection(dataStore, scope.methods._then, '"'); // Double Quote
            methodService.runTest(dataStore, '"');
            expect(scope.data.result).toBe(true);
        });

        it('should set the result when a test is (FALSE)', function () {

            methodService.addSection(dataStore, scope.methods._then, '"'); // Double Quote
            methodService.runTest(dataStore, ']]');
            expect(scope.data.result).toBe(false);
        });
    });


    //
    //
    // TESTER JS CODE
    //
    //
    it('should update the test code when the test string is updated (1)', function () {
        methodService.addTestString(dataStore, "shane");
        expect(dataStore.regexTestCode).toBe('tester.test("shane");');
    });

    it('should update the test code when the test string is updated (2)', function () {
        methodService.addTestString(dataStore, '"shane"');
        expect(dataStore.regexTestCode).toBe('tester.test("\\"shane\\"");');
    });

    /**
     *
     * Escaped Characters
     *
     */
    it('should accept a single double quote and return it escaped', function () {
        var output = methodService.escapeQuotes('"');
        expect(output).toBe('\\"');
    });

    it('should accept mulitple single double quotes and return them escaped', function () {
        var output = methodService.escapeQuotes('"""');
        expect(output).toBe('\\"\\"\\"');
    });

    it('should accept double in the middle of a stirng', function () {
        var output = methodService.escapeQuotes('shane"kittie');
        expect(output).toBe('shane\\"kittie');
    });

    it('should accept double quotes next to single quotes', function () {
        var output = methodService.escapeQuotes('"\'');
        expect(output).toBe('\\"\'');
    });

    it('should correctly test for multiple double quotes', function () {
        methodService.addSection(dataStore, scope.methods._then, '""'); // Double Quotes
        expect(scope.data.regexSections.length).toBe(1);
        expect(scope.data.regex).toBe('var tester = new RegExp("(?:\\"\\")", "gm");');
    });

//    it("", function () {
//        methodService.addSection(dataStore, scope.methods._range, "1", "0");
//        expect(scope.data.regexSections.length).toBe(0);
//        expect(scope.data.js_code).toBe("VerEx()");
//        expect(scope.data.regex).toBe('var tester = new RegExp();');
//        expect(scope.data.errorMessage).toBeDefined();
//    });
});