'use strict';

describe('Methods List E2E', function () {

    function fireInput(el) {
        el.query(function(el, done){
            var evt = document.createEvent('Event');
            evt.initEvent('input', false, true);
            el[0].dispatchEvent(evt);
            done();
        });
    }

    function fireKeyupInput(el) {
        el.query(function(el, done){
            var evt = document.createEvent('Event');
            evt.initEvent('keyup', false, true);
            el[0].dispatchEvent(evt);
            done();
        });
    }

    var rangeInput1, rangeInput2, thenInput, testInput, resetBtn, testButton;

    beforeEach(function() {
        browser().navigateTo('/index.html');
        this.regexCode = element("#regexCode");
        rangeInput1 = element('#range-input-01');
        rangeInput2 = element('#range-input-02');
        thenInput =  element('#input-then');
        testInput = element('#input-test');
        resetBtn = element('#btn-reset');
        testButton = element("#btn-run-test");

    });

    it('should have the initial JS code in place', function () {
        expect(this.regexCode.text()).toBe("var tester = new RegExp();");
    });

    describe("Working with start modifiers", function () {

        it('should update the on-screen regex when a button is clicked (adding one)', function () {

            var regexCode = element("#regexCode");
            element("#button-add-startOfLine").click();

            expect(this.regexCode.text()).toBe('var tester = new RegExp("^", "gm");');

            element("#button-add-withAnyCase").click();
            expect(this.regexCode.text()).toBe('var tester = new RegExp("^", "gim");');

        });

    });
//
    it('should not update the regex on screen if a section was added that required an input, but didn\'t get one', function () {
        element("#button-add-then").click();
        expect(this.regexCode.text()).toBe('var tester = new RegExp();');
    });
//
    it('should update the regex on screen with a section that has a paramater', function () {

        thenInput.val("shane");
        fireInput(thenInput);
        element("#button-add-then").click();
        expect(this.regexCode.text()).toBe('var tester = new RegExp("(?:shane)", "gm");');
    });

    it('should clear the input field after the add button was clicked', function () {

        thenInput.val("shane");
        fireInput(thenInput);
        element("#button-add-then").click();
        expect(thenInput.val()).toBe("");
    });

    it('should update the regex on screen with a section that has a paramater multiple times', function () {


        thenInput.val("shane");
        fireInput(thenInput);
        element("#button-add-then").click();

        var input = element("#input-maybe");
        input.val("kittie");
        fireInput(input);
        element("#button-add-maybe").click();
        expect(this.regexCode.text()).toBe('var tester = new RegExp("(?:shane)(?:kittie)?", "gm");');

    });

    it("should accept 2 param inputs for the range method", function () {

        var button = element("#button-add-range");

        var rangeTests = [
            ['shane', 'kittie', 'var tester = new RegExp("[shane-kittie]", "gm");'],
            ['1', '7', 'var tester = new RegExp("[shane-kittie][1-7]", "gm");']
        ];

        angular.forEach(rangeTests, function (item, i) {
            rangeInput1.val(item[0]);
            rangeInput2.val(item[1]);
            fireInput(rangeInput1);
            fireInput(rangeInput2);
            button.click();
            expect(this.regexCode.text()).toBe(item[2]);
        }, this);
    });

    it("should clear both input fields when a range was added", function () {
        rangeInput1.val("a");
        rangeInput2.val("z");
        fireInput(rangeInput1);
        fireInput(rangeInput2);
        var button = element("#button-add-range");
        button.click();
        expect(rangeInput1.val()).toBe("");
        expect(rangeInput2.val()).toBe("");
    });


    //
    //
    //
    // Reset Stuff
    //
    //
    //

    it('should reset the regexCode on screen when reset is clicked', function () {

        thenInput.val("shane");
        fireInput(thenInput);
        element("#button-add-then").click();

        resetBtn.click();

        expect(this.regexCode.text()).toBe('var tester = new RegExp();');
    });

    it('should reset the test input field when reset is clicked', function () {

        testInput.val("shane");
        fireInput(testInput);

        resetBtn.click();

        expect(testInput.val()).toBe('');
    });

    it('should correctly reset the result value when the reset method is called', function () {

        thenInput.val("shane");
        fireInput(thenInput);
        element("#button-add-then").click();

        testInput.val("chicken");
        fireInput(testInput);
        element("#btn-run-test").click(); // run test

        resetBtn.click(); //reset ui
        expect(element("#result-output").text()).toBe("n/a");
    });

        describe("The Information notice", function () {

            it('should be present on page load', function () {
                expect(element("#intro:visible").count()).toBe(1);
            });

            it("should not be visible when a regex section exists", function () {
                thenInput.val("shane");
                fireInput(thenInput);
                element("#button-add-then").click();
                expect(element("#intro:visible").count()).toBe(0);
            });

            it("should be visible if sections are added, but then the app is reset", function () {
                thenInput.val("shane");
                fireInput(thenInput);
                element("#button-add-then").click();
                resetBtn.click();
                expect(element("#intro:visible").count()).toBe(1);
            });

        });

        describe("the testing area", function () {

            var testContainer;
            beforeEach(function () {
                testContainer = element("#test-container:visible");
            });

            it("should not be visible when there is nothing to test (ie, not sectioned added yet.)", function () {
                expect(testContainer.count()).toBe(0);
            });

            it("should be visible when a section is added", function () {
                thenInput.val("shane");
                fireInput(thenInput);
                element("#button-add-then").click();
                expect(testContainer.count()).toBe(1);
            });

            it("should be visible when a section is added", function () {
                thenInput.val("shane");
                fireInput(thenInput);
                element("#button-add-then").click();
                resetBtn.click();
                expect(testContainer.count()).toBe(0);
            });
        });

         describe("the error message", function () {

            var errorText;

            beforeEach(function () {
                rangeInput1.val(1);
                rangeInput2.val(0);
                fireInput(rangeInput1);
                fireInput(rangeInput2);
                element("#button-add-range").click();
                errorText = element("#errorText");
            });

            it("should display when an error occured", function () {
                expect(errorText.text()).toBe("You can't do that with the Range input. ");
            });

            it("should remove the error when the close button is clicked", function () {
                element("#errorClose").click();
                expect(errorText.count()).toBe(0);
            });

        });

    describe("the shorthand Regex section", function () {

        var shorthandRegex;
        beforeEach(function(){
            shorthandRegex = element("#shorthandRegex");
        });

        it('should start with the correct default value', function () {
            expect(shorthandRegex.text()).toBe('//gm.test()');
        });

        it('should be updated with the correct value when a section is added', function () {
            thenInput.val("shane");
            fireInput(thenInput);
            element("#button-add-then").click();
            expect(shorthandRegex.text()).toBe('/(?:shane)/gm.test()');
        });

        it('should be reset when the reset method is called', function () {

            thenInput.val("shane");
            fireInput(thenInput);
            element("#button-add-then").click();
            resetBtn.click();

            expect(shorthandRegex.text()).toBe('//gm.test()');
        });

        ddescribe("adding test strings", function () {
            it("should update the test code with the test string", function () {
                thenInput.val("shane");
                fireInput(thenInput);
                element("#button-add-then").click();

                testInput.val("a']\"");
                fireInput(testInput);
                testButton.click();

                expect(shorthandRegex.text()).toBe('/(?:shane)/gm.test("a\']\\"")');
            });
        });
    });
});