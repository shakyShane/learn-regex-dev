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
        expect(dataStore.js_code).toBe('VerEx().startOfLine().then("testString")');
        expect(dataStore.regex).toBe('var tester = new RegExp("^(?:testString)", "gm");');
    });

    // with Any case
    it('should add a "With any Case" Modifier', function () {
        methodService.addSection(dataStore, scope.methods._withAnyCase, "");
        methodService.addSection(dataStore, scope.methods._then, "testString");
        expect(dataStore.js_code).toBe('VerEx().withAnyCase().then("testString")');
        expect(dataStore.regex).toBe('var tester = new RegExp("(?:testString)", "gim");');
    });

    // End of Line
    it('should add a "end of line" Modifier', function () {
        methodService.addSection(dataStore, scope.methods._endOfLine, "");
        methodService.addSection(dataStore, scope.methods._then, "testString");
        expect(dataStore.js_code).toBe('VerEx().endOfLine().then("testString")');
        expect(dataStore.regex).toBe('var tester = new RegExp("(?:testString)$", "gm");');
    });


    // Groups
    //Then
    it('should add multiple "Then" groups', function () {
        methodService.addSection(dataStore, scope.methods._then, "test");
        expect(dataStore.js_code).toBe('VerEx().then("test")');
        expect(dataStore.regex).toBe('var tester = new RegExp("(?:test)", "gm");');

        methodService.addSection(dataStore, scope.methods._then, "test2");
        expect(dataStore.js_code).toBe('VerEx().then("test").then("test2")');
        expect(dataStore.regex).toBe('var tester = new RegExp("(?:test)(?:test2)", "gm");');
    });

    // Maybe + then
    it('should add a mixture of Maybe & then groups', function () {
        methodService.addSection(dataStore, scope.methods._maybe, "test");
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

    // Range
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

        describe("being added", function () {
            beforeEach(function(){
                methodService.addSection(dataStore, scope.methods._space);
            });
            it("should update the Js Code", function () {
                expect(dataStore.js_code).toBe('VerEx().then(" ")');
            });
            it("should update the regex", function () {
                expect(dataStore.regex).toBe('var tester = new RegExp("(?: )", "gm");');
            });
        });

        describe("added in the middle of a bunch of sections", function () {
            beforeEach(function(){
                methodService.addSection(dataStore, scope.methods._then, "shane");
                methodService.addSection(dataStore, scope.methods._space);
                methodService.addSection(dataStore, scope.methods._maybe, "osbourne");
            });
            it("should update the JS code", function () {
                expect(dataStore.js_code).toBe('VerEx().then("shane").then(" ").maybe("osbourne")');
            });
            it("should update the regex code", function () {
                expect(dataStore.regex).toBe('var tester = new RegExp("(?:shane)(?: )(?:osbourne)?", "gm");');
            });
        });
    });

    describe("the 'numMatches' section", function () {
        describe("adding without any other sections (eg: /{1,2}/.test() ", function () {
            beforeEach(function(){
                methodService.addSection(dataStore, scope.methods._numMatches, "2");
            });
            it("should not update the JS code", function () {
                expect(dataStore.js_code).toBe("VerEx()");
            });
            it("should not update the regex", function () {
                expect(dataStore.regex).toBe('var tester = new RegExp();');
            });
            it("should set an error message", function () {
                expect(dataStore.errorMessage.length).toBeTruthy();
            });
        });
        describe("with 1 param", function () {
            beforeEach(function(){
                methodService.addSection(dataStore, scope.methods._then, "shane");
                methodService.addSection(dataStore, scope.methods._numMatches, "2");
            });
            it("should update the fields", function () {
                expect(dataStore.js_code).toBe('VerEx().then("shane").numMatches("2")');
            });
            it("should update the regex", function () {
                expect(dataStore.regex).toBe('var tester = new RegExp("(?:shane){2}", "gm");');
            });
        });
        describe("with 1 param mulitple times", function () {
            beforeEach(function(){
                methodService.addSection(dataStore, scope.methods._then, "shane");
                methodService.addSection(dataStore, scope.methods._numMatches, "2");
                methodService.addSection(dataStore, scope.methods._then, "shane");
                methodService.addSection(dataStore, scope.methods._numMatches, "3");
            });
            it("should update the fields", function () {
                expect(dataStore.js_code).toBe('VerEx().then("shane").numMatches("2").then("shane").numMatches("3")');
            });
            it("should update the regex", function () {
                expect(dataStore.regex).toBe('var tester = new RegExp("(?:shane){2}(?:shane){3}", "gm");');
            });
        });
        describe("with 2 params", function () {
            beforeEach(function(){
                methodService.addSection(dataStore, scope.methods._then, "shane");
                methodService.addSection(dataStore, scope.methods._numMatches, "2", "3");
            });
            it("should update the JS code", function () {
                expect(dataStore.js_code).toBe('VerEx().then("shane").numMatches("2", "3")');
            });
            it("should update the regex", function () {
                expect(dataStore.regex).toBe('var tester = new RegExp("(?:shane){2,3}", "gm");');
            });
        });
        describe("with 2 params multiple times", function () {
            beforeEach(function(){
                methodService.addSection(dataStore, scope.methods._then, "a");
                methodService.addSection(dataStore, scope.methods._numMatches, "2", "3");
                methodService.addSection(dataStore, scope.methods._then, "a");
                methodService.addSection(dataStore, scope.methods._numMatches, "1", "2");
            });
            it("should update the JS code", function () {
                expect(dataStore.js_code).toBe('VerEx().then("a").numMatches("2", "3").then("a").numMatches("1", "2")');
            });
            it("should update the regex", function () {
                expect(dataStore.regex).toBe('var tester = new RegExp("(?:a){2,3}(?:a){1,2}", "gm");');
            });
        });

        describe("handing errors when params in wrong order", function () {
            beforeEach(function(){
                methodService.addSection(dataStore, scope.methods._then, "shane");
                methodService.addSection(dataStore, scope.methods._numMatches, "1", "0");
            });
            it("should not add the section", function () {
                expect(dataStore.regexSections.length).toBe(1);
            });
            it("should not update the JS code", function () {
                expect(dataStore.js_code).toBe('VerEx().then("shane")');
            });
            it("should update the regex", function () {
                expect(dataStore.regex).toBe('var tester = new RegExp("(?:shane)", "gm");');
            });
            it("should set an error message", function () {
                expect(dataStore.errorMessage.length).toBeTruthy();
            });
        });
    });
});