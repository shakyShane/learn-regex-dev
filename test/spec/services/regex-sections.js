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
        scope.regex = methodService.initJs();
        scope.regexSections = [];
        dataStore = DataStore;
        var modifiers = scope.modifiers;

    }));

    // Start of Line
    it('should add a "Start of line section" modifier', function () {

        methodService.addSection(dataStore, scope.methods._startOfLine, "");
        methodService.addSection(dataStore, scope.methods._then, "testString");
        expect(dataStore.js_code).toBeDefined();
        expect(dataStore.js_code).toBe('VerEx().startOfLine().then("testString")');
        expect(dataStore.regex).toBe('var tester = new RegExp("^(?:testString)", "gm");');
    });

    // with Any case
    it('should add a "With any Case" Modifier', function () {
        methodService.addSection(dataStore, scope.methods._withAnyCase, "");
        methodService.addSection(dataStore, scope.methods._then, "testString");
        expect(dataStore.js_code).toBeDefined();
        expect(dataStore.js_code).toBe('VerEx().withAnyCase().then("testString")');
        expect(dataStore.regex).toBe('var tester = new RegExp("(?:testString)", "gim");');
    });

    // End of Line
    it('should add a "end of line" Modifier', function () {
        methodService.addSection(dataStore, scope.methods._endOfLine, "");
        methodService.addSection(dataStore, scope.methods._then, "testString");
        expect(dataStore.js_code).toBeDefined();
        expect(dataStore.js_code).toBe('VerEx().endOfLine().then("testString")');
        expect(dataStore.regex).toBe('var tester = new RegExp("(?:testString)$", "gm");');
    });


    // Groups
    //Then
    it('should add multiple "Then" groups', function () {
        methodService.addSection(dataStore, scope.methods._then, "test");
        expect(dataStore.js_code).toBeDefined();
        expect(dataStore.js_code).toBe('VerEx().then("test")');
        expect(dataStore.regex).toBe('var tester = new RegExp("(?:test)", "gm");');

        methodService.addSection(dataStore, scope.methods._then, "test2");
        expect(dataStore.js_code).toBe('VerEx().then("test").then("test2")');
        expect(dataStore.regex).toBe('var tester = new RegExp("(?:test)(?:test2)", "gm");');
    });

    // Maybe + then
    it('should add a mixture of Maybe & then groups', function () {
        methodService.addSection(dataStore, scope.methods._maybe, "test");
        expect(dataStore.js_code).toBeDefined();
        expect(dataStore.js_code).toBe('VerEx().maybe("test")');
        expect(dataStore.regex).toBe('var tester = new RegExp("(?:test)?", "gm");');

        methodService.addSection(dataStore, scope.methods._then, "test");
        expect(dataStore.js_code).toBe('VerEx().maybe("test").then("test")');
        expect(dataStore.regex).toBe('var tester = new RegExp("(?:test)?(?:test)", "gm");');
    });

    // Any of
    it('Should correctly add a "anyof" group', function () {
        methodService.addSection(dataStore, scope.methods._anyOf, "test");
        methodService.addSection(dataStore, scope.methods._anyOf, ";");
        methodService.addSection(dataStore, scope.methods._then, "that");
        expect(dataStore.js_code).toBe('VerEx().anyOf("test").anyOf(";").then("that")');
        expect(dataStore.regex).toBe('var tester = new RegExp("[test][;](?:that)", "gm");');
    });

    // Range with numbers as params
    it('Should correctly add a "range" group with numbers', function () {
        methodService.addSection(dataStore, scope.methods._range, 1, 2);
        expect(dataStore.js_code).toBe('VerEx().range("1", "2")');
        expect(dataStore.regex).toBe('var tester = new RegExp("[1-2]", "gm");');
    });

    // Range with Strings as params
    it('Should correctly add a "range" group with strings', function () {
        methodService.addSection(dataStore, scope.methods._range, "a", "z");
        expect(dataStore.js_code).toBe('VerEx().range("a", "z")');
        expect(dataStore.regex).toBe('var tester = new RegExp("[a-z]", "gm");');
    });

    // Range - Not implemented yet!
    it('Should correctly add multiple "range" groups with strings or numbers', function () {
        methodService.addSection(dataStore, scope.methods._range, "a", "z");
        methodService.addSection(dataStore, scope.methods._range, "0", "9");
        expect(dataStore.js_code).toBe('VerEx().range("a", "z").range("0", "9")');
        expect(dataStore.regex).toBe('var tester = new RegExp("[a-z][0-9]", "gm");');
    });

    // Or
    it('Should correctly add an or conditional to the regex', function () {

        methodService.addSection(dataStore, scope.methods._then, "a");
        methodService.addSection(dataStore, scope.methods._or, "");
        methodService.addSection(dataStore, scope.methods._then, "4");

        expect(dataStore.js_code).toBe('VerEx().then("a").or().then("4")');
        expect(dataStore.regex).toBe('var tester = new RegExp("(?:(?:a))|(?:(?:4))", "gm");');
    });

    // Anything
    it('should correctly add the "anything" group', function () {

        methodService.addSection(dataStore, scope.methods._anything, "a");
        expect(dataStore.js_code).toBe('VerEx().anything()');
        expect(dataStore.regex).toBe('var tester = new RegExp("(?:.*)", "gm");');
    });

    // Anything + then
    it('should correctly add the "anything" group multiple times and with another type.', function () {

        methodService.addSection(dataStore, scope.methods._anything, "");
        methodService.addSection(dataStore, scope.methods._then, "test");
        methodService.addSection(dataStore, scope.methods._anything, "");
        expect(dataStore.js_code).toBe('VerEx().anything().then("test").anything()');
        expect(dataStore.regex).toBe('var tester = new RegExp("(?:.*)(?:test)(?:.*)", "gm");');
    });


    // Word
    it('should add the word flag', function () {

        methodService.addSection(dataStore, scope.methods._word, "");
        expect(dataStore.js_code).toBe('VerEx().word()');
        expect(dataStore.regex).toBe('var tester = new RegExp("\\w+", "gm");');
    });

    // anythingBut
    it("should add the 'anythingBut' section", function () {

        methodService.addSection(dataStore, scope.methods._anythingBut, "a");
        expect(dataStore.js_code).toBe('VerEx().anythingBut("a")');
        expect(dataStore.regex).toBe('var tester = new RegExp("(?:[^a])", "gm");');
    });


    describe("the Space Section", function () {

        it("should be added", function () {

            methodService.addSection(dataStore, scope.methods._space);
            expect(dataStore.js_code).toBe('VerEx().then(" ")');
            expect(dataStore.regex).toBe('var tester = new RegExp("(?: )", "gm");');
        });

        it("should be added in the middle of a bunch of sections", function () {

            methodService.addSection(dataStore, scope.methods._then, "shane");
            methodService.addSection(dataStore, scope.methods._space);
            methodService.addSection(dataStore, scope.methods._maybe, "osbourne");

            expect(dataStore.js_code).toBe('VerEx().then("shane").then(" ").maybe("osbourne")');
            expect(dataStore.regex).toBe('var tester = new RegExp("(?:shane)(?: )(?:osbourne)?", "gm");');
        });

    });


//    var testString = "3";
//    var tester = new RegExp("\\t", "gm");


//    console.log(tester.test("thatweferger"));
//        var tester = new RegExp("[1-3]", "gm");
//        console.log(tester.test(testString));
//        testString = testString.replace(tester, ",");
//        console.log(testString);
});