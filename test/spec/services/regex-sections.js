'use strict';

describe('Service: Methods functionality', function () {

    // load the controller's module
    beforeEach(module('ngRegexApp'));

    var methodService,
            scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, MethodService, Methods) {

        scope = $rootScope.$new();
        scope.methods = Methods;
        methodService = MethodService;
        scope.regex = methodService.initJs();
        scope.regexSections = [];

        var modifiers = scope.modifiers;

    }));

    // Start of Line
    it('should add a "Start of line section" modifier', function () {
        methodService.addSection(scope, scope.methods._startOfLine, "");
        methodService.addSection(scope, scope.methods._then, "testString");
        expect(scope.js_code).toBeDefined();
        expect(scope.js_code).toBe('VerEx().startOfLine().then("testString")');
        expect(scope.regex).toBe('var tester = new RegExp("^(?:testString)", "gm");');
    });

    // with Any case
    it('should add a "With any Case" Modifier', function () {
        methodService.addSection(scope, scope.methods._withAnyCase, "");
        methodService.addSection(scope, scope.methods._then, "testString");
        expect(scope.js_code).toBeDefined();
        expect(scope.js_code).toBe('VerEx().withAnyCase().then("testString")');
        expect(scope.regex).toBe('var tester = new RegExp("(?:testString)", "gim");');
    });

    // End of Line
    it('should add a "end of line" Modifier', function () {
        methodService.addSection(scope, scope.methods._endOfLine, "");
        methodService.addSection(scope, scope.methods._then, "testString");
        expect(scope.js_code).toBeDefined();
        expect(scope.js_code).toBe('VerEx().endOfLine().then("testString")');
        expect(scope.regex).toBe('var tester = new RegExp("(?:testString)$", "gm");');
    });


    // Groups
    //Then
    it('should add multiple "Then" groups', function () {
        methodService.addSection(scope, scope.methods._then, "test");
        expect(scope.js_code).toBeDefined();
        expect(scope.js_code).toBe('VerEx().then("test")');
        expect(scope.regex).toBe('var tester = new RegExp("(?:test)", "gm");');

        methodService.addSection(scope, scope.methods._then, "test2");
        expect(scope.js_code).toBe('VerEx().then("test").then("test2")');
        expect(scope.regex).toBe('var tester = new RegExp("(?:test)(?:test2)", "gm");');
    });

    // Maybe + then
    it('should add a mixture of Maybe & then groups', function () {
        methodService.addSection(scope, scope.methods._maybe, "test");
        expect(scope.js_code).toBeDefined();
        expect(scope.js_code).toBe('VerEx().maybe("test")');
        expect(scope.regex).toBe('var tester = new RegExp("(?:test)?", "gm");');

        methodService.addSection(scope, scope.methods._then, "test");
        expect(scope.js_code).toBe('VerEx().maybe("test").then("test")');
        expect(scope.regex).toBe('var tester = new RegExp("(?:test)?(?:test)", "gm");');
    });

    // Any of
    it('Should correctly add a "anyof" group', function () {
        methodService.addSection(scope, scope.methods._anyOf, "test");
        methodService.addSection(scope, scope.methods._anyOf, ";");
        methodService.addSection(scope, scope.methods._then, "that");
        expect(scope.js_code).toBe('VerEx().anyOf("test").anyOf(";").then("that")');
        expect(scope.regex).toBe('var tester = new RegExp("[test][;](?:that)", "gm");');
    });

    // Range with numbers as params
    it('Should correctly add a "range" group with numbers', function () {
        methodService.addSection(scope, scope.methods._range, 1, 2);
        expect(scope.js_code).toBe('VerEx().range("1", "2")');
        expect(scope.regex).toBe('var tester = new RegExp("[1-2]", "gm");');
    });

    // Range with Strings as params
    it('Should correctly add a "range" group with strings', function () {
        methodService.addSection(scope, scope.methods._range, "a", "z");
        expect(scope.js_code).toBe('VerEx().range("a", "z")');
        expect(scope.regex).toBe('var tester = new RegExp("[a-z]", "gm");');
    });

    // Range - Not implemented yet!
    it('Should correctly add multiple "range" groups with strings or numbers', function () {
        methodService.addSection(scope, scope.methods._range, "a", "z");
        methodService.addSection(scope, scope.methods._range, "0", "9");
        expect(scope.js_code).toBe('VerEx().range("a", "z").range("0", "9")');
        expect(scope.regex).toBe('var tester = new RegExp("[a-z][0-9]", "gm");');
    });

    // Or
    it('Should correctly add an or conditional to the regex', function () {

        methodService.addSection(scope, scope.methods._then, "a");
        methodService.addSection(scope, scope.methods._or, "");
        methodService.addSection(scope, scope.methods._then, "4");

        expect(scope.js_code).toBe('VerEx().then("a").or().then("4")');
        expect(scope.regex).toBe('var tester = new RegExp("(?:(?:a))|(?:(?:4))", "gm");');
    });

    // Anything
    it('should correctly add the "anything" group', function () {
        methodService.addSection(scope, scope.methods._anything, "a");
        expect(scope.js_code).toBe('VerEx().anything()');
        expect(scope.regex).toBe('var tester = new RegExp("(?:.*)", "gm");');
    });

    // Anything + then
    it('should correctly add the "anything" group multiple times and with another type.', function () {
        methodService.addSection(scope, scope.methods._anything, "");
        methodService.addSection(scope, scope.methods._then, "test");
        methodService.addSection(scope, scope.methods._anything, "");
        expect(scope.js_code).toBe('VerEx().anything().then("test").anything()');
        expect(scope.regex).toBe('var tester = new RegExp("(?:.*)(?:test)(?:.*)", "gm");');
    });


    // Word
    it('should add the word flag', function () {
        methodService.addSection(scope, scope.methods._word, "");
        expect(scope.js_code).toBe('VerEx().word()');
        expect(scope.regex).toBe('var tester = new RegExp("\\w+", "gm");');

    });

//    var testString = "3";
//    var tester = new RegExp("\\t", "gm");


//    console.log(tester.test("thatweferger"));
//        var tester = new RegExp("[1-3]", "gm");
//        console.log(tester.test(testString));
//        testString = testString.replace(tester, ",");
//        console.log(testString);
});