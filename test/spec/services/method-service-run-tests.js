'use strict';

describe('Method Service: When running tests', function () {

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

    describe("using modifiers", function () {

        var test;

        beforeEach(function(){
            methodService.addSection(scope, methods._then, "shane");
        });

        it("should run a TRUE test with start of String", function () {
            methodService.addSection(scope, methods._startOfLine, "");
            test = methodService.runTest(scope, "shane");
            expect(test).toBe(true);
        });

        it("should run a FALSE test with start of String", function () {
            methodService.addSection(scope, methods._startOfLine, "");
            test = methodService.runTest(scope, "dshane");
            expect(test).toBe(false);
        });

        // End of string
        it("should run a TRUE test with End of a string", function () {
            methodService.addSection(scope, methods._endOfLine, "");
            test = methodService.runTest(scope, "ranomc./wdshane");
            expect(test).toBe(true);
        });

        it("should run a FALSE test with End of a string", function () {
            methodService.addSection(scope, methods._endOfLine, "");
            test = methodService.runTest(scope, "ranshaneomc./wd");
            expect(test).toBe(false);
        });

        it("should run a TRUE test with 'withAnyCase'", function () {
            methodService.addSection(scope, methods._withAnyCase, "");
            test = methodService.runTest(scope, "SHANE");
            expect(test).toBe(true);
        });
        it("should run a FALSE test with 'withAnyCase'", function () {
            test = methodService.runTest(scope, "SHANE");
            expect(test).toBe(false);
        });

    });

    describe("using THEN", function () {

        var test;
        it("should run a TRUE test", function () {
            methodService.addSection(scope, methods._then, "shane");
            test = methodService.runTest(scope, "shane");
            expect(test).toBe(true);
        });

        it("should run a TRUE test with multiple blocks", function () {
            methodService.addSection(scope, methods._then, "shane ");
            methodService.addSection(scope, methods._then, "is ");
            methodService.addSection(scope, methods._then, "awesome");
            test = methodService.runTest(scope, "shane is awesome");
            expect(test).toBe(true);
        });

    });

    describe("using MAYBE", function () {

        var test;
        beforeEach(function(){
            methodService.addSection(scope, methods._then, "http");
            methodService.addSection(scope, methods._maybe, "s");
            methodService.addSection(scope, methods._then, "://");
        });

        it("should run a TRUE test (1)", function () {
            test = methodService.runTest(scope, "https://github.com/timdouglas/grunt-cache-breaker");
            expect(test).toBe(true);
        });
        it("should run a TRUE test (2)", function () {
            test = methodService.runTest(scope, "https://github.com/timdouglas/grunt-cache-breaker");
            expect(test).toBe(true);
        });
        it("should run a FALSE test", function () {
            test = methodService.runTest(scope, "ftp://github.com/timdouglas/grunt-cache-breaker");
            expect(test).toBe(false);
        });
    });


    describe("using ANYOF", function () {

        var test;
        beforeEach(function(){
            methodService.addSection(scope, methods._then, "shane");
            methodService.addSection(scope, methods._anyOf, " -");
            methodService.addSection(scope, methods._then, "osbourne");
        });

        it("should run a TRUE test (1)", function () {
            test = methodService.runTest(scope, "shane osbourne");
            expect(test).toBe(true);
        });
        it("should run a TRUE test (2)", function () {
            test = methodService.runTest(scope, "shane-osbourne");
            expect(test).toBe(true);
        });
        it("should run a FALSE test", function () {
            test = methodService.runTest(scope, "shaneosbourne");
            expect(test).toBe(false);
        });
    });



    describe("the 'range' section", function () {

        describe("when using NUMBERS" , function () {

            beforeEach(function(){
                methodService.addSection(scope, methods._range, "0", "1");
            });

            it("should run a TRUE test", function () {
                var test = methodService.runTest(scope, "1");
                expect(test).toBe(true);
            });

            it("should run a FALSE test", function () {
                var test = methodService.runTest(scope, "3");
                expect(test).toBe(false);
            });
        });

        describe("when using LETTERS" , function () {

            var test;
            beforeEach(function(){
                methodService.addSection(scope, methods._range, "a", "d");
            });

            it("should run a TRUE test", function () {
                test = methodService.runTest(scope, "a");
                expect(test).toBe(true);
            });

            it("should run a FALSE test", function () {
                test = methodService.runTest(scope, "e");
                expect(test).toBe(false);
            });
        });
    });

    // range

    describe("the 'or' section", function () {
        var test;

        beforeEach(function(){
            methodService.addSection(scope, methods._then, "a");
            methodService.addSection(scope, methods._or);
            methodService.addSection(scope, methods._then, "b");
        });

        it("should run a TRUE test", function () {
            test = methodService.runTest(scope, "a");
            expect(test).toBe(true);
        });
        it("should run a FALSE test", function () {
            test = methodService.runTest(scope, "e");
            expect(test).toBe(false);
        });

    });

    describe("the 'anything' section", function () {

        beforeEach(function () {
            methodService.addSection(scope, methods._anything);
        });

        it("should always return TRUE if a param is provided", function () {
            var test = methodService.runTest(scope, "1");
            expect(test).toBe(true);
            test = methodService.runTest(scope, "0");
            expect(test).toBe(true);
            test = methodService.runTest(scope, "07899rfwerqnweflkjqnef");
            expect(test).toBe(true);
        });

        it("should always return false if nothing is provided for the test", function () {
            methodService.addSection(scope, methods._anything);
            var test = methodService.runTest(scope, "");
            expect(test).toBe(false);
        });
    });

    describe("the 'anything' section Wedged in the middle", function () {

        var test;

        beforeEach(function () {
            methodService.addSection(scope, methods._then, "a");
            methodService.addSection(scope, methods._anything);
            methodService.addSection(scope, methods._then, "b");
        });

        it("should run a FALSE test", function () {
            test = methodService.runTest(scope, "a");
            expect(test).toBe(false);
        });

        it("should run a TRUE test", function () {
            test = methodService.runTest(scope, "aanythingthiasb");
            expect(test).toBe(true);
        });
    });

    describe("the 'Word' section", function () {

        beforeEach(function () {
            methodService.addSection(scope, methods._then, "a");
            methodService.addSection(scope, methods._word);
            methodService.addSection(scope, methods._then, "b");
        });

        it("should run a TRUE test", function () {
            var test = methodService.runTest(scope, "a9b");
            expect(test).toBe(true);
        });

        it("should run a FALSE (1)", function () {
            var test = methodService.runTest(scope, "ab");
            expect(test).toBe(false);
        });

        it("should run a FALSE (2)", function () {
            var test = methodService.runTest(scope, "a-b");
            expect(test).toBe(false);
        });
        it("should run a FALSE (3)", function () {
            var test = methodService.runTest(scope, "a[b");
            expect(test).toBe(false);
        });

    });

    describe("the Anything But section", function () {

        it("should run a TRUE test", function () {
            methodService.addSection(scope, methods._anythingBut, "a");
            var test = methodService.runTest(scope, "ab");
            expect(test).toBe(true);
        });

        it("should run a TRUE test when wedged in between others", function () {

            methodService.addSection(scope, methods._then, "a");
            methodService.addSection(scope, methods._anythingBut, "b");
            methodService.addSection(scope, methods._then, "c");
            var test = methodService.runTest(scope, "auc");
            expect(test).toBe(true);
        });

        it("should run a FALSE", function () {
            methodService.addSection(scope, methods._anythingBut, "a");
            var test = methodService.runTest(scope, "a");
            expect(test).toBe(false);
        });

        it("should run a FALSE test when wedged in between others", function () {

            methodService.addSection(scope, methods._then, "a");
            methodService.addSection(scope, methods._anythingBut, "b");
            methodService.addSection(scope, methods._then, "c");
            var test = methodService.runTest(scope, "abc");
            expect(test).toBe(false);
        });
    });

    describe("the SPACE section", function () {

        it("should run a TRUE test", function () {

            methodService.addSection(scope, methods._space);
            var test = methodService.runTest(scope, " ");
            expect(test).toBe(true);
        });

        it("should run a FALSE test", function () {

            methodService.addSection(scope, methods._space);
            var test = methodService.runTest(scope, "rwthwrt");
            expect(test).toBe(false);
        });

        it("should run a TRUE test wedged in the middle", function () {

            methodService.addSection(scope, methods._then, "a");
            methodService.addSection(scope, methods._space);
            methodService.addSection(scope, methods._then, "b");
            var test = methodService.runTest(scope, "a b");
            expect(test).toBe(true);
        });
        it("should run a FALSE test wedged in the middle", function () {

            methodService.addSection(scope, methods._then, "a");
            methodService.addSection(scope, methods._space);
            methodService.addSection(scope, methods._then, "b");
            var test = methodService.runTest(scope, "a'b");
            expect(test).toBe(false);
        });

        it("should run a TRUE test with a space at the start of the input", function () {
            methodService.addSection(scope, methods._space);
            methodService.addSection(scope, methods._then, "b");
            var test = methodService.runTest(scope, " b");
            expect(test).toBe(true);
        });
        it("should run a FALSE test with a space at the start of the input", function () {
            methodService.addSection(scope, methods._space);
            methodService.addSection(scope, methods._then, "b");
            var test = methodService.runTest(scope, "b ");
            expect(test).toBe(false);
        });
    });
    describe("the numMatches section", function () {
        describe("with 1 param & 1 match", function () {
            beforeEach(function(){
                methodService.addSection(scope, methods._then, "a");
                methodService.addSection(scope, methods._numMatches, "1");
            });
            it("should run a true test", function () {
                var test = methodService.runTest(scope, "a");
                expect(test).toBe(true);
            });
            it("should run a false test", function () {
                var test = methodService.runTest(scope, "b");
                expect(test).toBe(false);
            });
        });
        describe("with 1 param & 2 matches", function () {
            beforeEach(function(){
                methodService.addSection(scope, methods._then, "a");
                methodService.addSection(scope, methods._numMatches, "2");
            });
            it("should run a true test", function () {
                var test = methodService.runTest(scope, "aa");
                expect(test).toBe(true);
            });
            it("should run a false test", function () {
                var test = methodService.runTest(scope, "a");
                expect(test).toBe(false);
            });
        });
        describe("with 2 param & between 2 & 4matches", function () {
            beforeEach(function(){
                methodService.addSection(scope, methods._then, "a");
                methodService.addSection(scope, methods._numMatches, "2", "4");
            });
            it("should run a true test (1)", function () {
                var test = methodService.runTest(scope, "aa");
                expect(test).toBe(true);
            });
            it("should run a true test (2)", function () {
                var test = methodService.runTest(scope, "aaa");
                expect(test).toBe(true);
            });
            it("should run a true test (3)", function () {
                var test = methodService.runTest(scope, "aaaa");
                expect(test).toBe(true);
            });
            it("should run a FALSE test", function () {
                var test = methodService.runTest(scope, "a");
                expect(test).toBe(false);
            });
        });
        describe("with 1 param, 1 match multiple times", function () {
            beforeEach(function(){
                methodService.addSection(scope, methods._then, "a");
                methodService.addSection(scope, methods._numMatches, "1");
                methodService.addSection(scope, methods._then, "b");
                methodService.addSection(scope, methods._numMatches, "2");
            });
            it("should run a true test (1)", function () {
                var test = methodService.runTest(scope, "abb");
                expect(test).toBe(true);
            });
            it("should run a true test (2)", function () {
                var test = methodService.runTest(scope, "aaaaabb");
                expect(test).toBe(true);
            });
            it("should run a true test (3)", function () {
                var test = methodService.runTest(scope, "abbewe");
                expect(test).toBe(true);
            });
            it("should run a FALSE test", function () {
                var test = methodService.runTest(scope, "bba");
                expect(test).toBe(false);
            });
        });
    });
});