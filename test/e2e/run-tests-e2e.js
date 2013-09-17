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

    var rangeInput1, rangeInput2, thenInput, resultOutput, testButton, testInput;

    beforeEach(function() {
        browser().navigateTo('/index.html');
        this.regexCode = element("#regexCode");
        rangeInput1 = element('#range-input-01');
        rangeInput2 = element('#range-input-02');
        thenInput = element('#input-then');
        testInput = element("#input-test");
        resultOutput = element("#result-output");
        testButton = element("#btn-run-test");
    });


    it('should run a test using THEN & display the result (true)', function () {

        var input = element('#input-then');
        input.val("shane");
        fireInput(input);
        element("#button-add-then").click();

        input = element("#input-test");
        input.val("shane");
        fireInput(input);

        var testButton = element("#btn-run-test");
        testButton.click();

        var resultInput = element("#result-output");
        expect(resultInput.text()).toBe("true");
    });

    it('should run a test using THEN and display the output (false)', function () {

        var input = element('#input-then');
        input.val("shane");
        fireInput(input);
        element("#button-add-then").click();

        input = element("#input-test");
        input.val("kittie");
        fireInput(input);

        var testButton = element("#btn-run-test");
        testButton.click();

        var resultInput = element("#result-output");
        expect(resultInput.text()).toBe("false");

    });

    // Range - TRUE
    it('should run a test using range and display the output (true)', function () {

        rangeInput1.val("1");
        fireInput(rangeInput1);

        rangeInput2.val("5");
        fireInput(rangeInput2);

        element("#button-add-range").click();
        testInput.val("3");
        fireInput(testInput);
        testButton.click();

        expect(resultOutput.text()).toBe("true");

    });

    // Range - FALSE
    it('should run a test using range and display the output (false)', function () {

        rangeInput1.val("1");
        fireInput(rangeInput1);

        rangeInput2.val("5");
        fireInput(rangeInput2);

        element("#button-add-range").click();

        testInput.val("a");
        fireInput(testInput);
        testButton.click();

        expect(resultOutput.text()).toBe("false");
    });

    // Range - FALSE
    it('should run a test using range and display the output (false)', function () {

        var input = element("#input-anythingBut");
        input.val("1");
        fireInput(input);

        element("#button-add-anythingBut").click();

        testInput.val("a");
        fireInput(testInput);
        testButton.click();

        expect(resultOutput.text()).toBe("true");
    });

    describe("running tests with spaces in the regex", function () {
        it("should run a TRUE test", function () {
            thenInput.val(" a");
            fireInput(thenInput);
            element("#button-add-then").click();

            testInput.val(" a");
            fireInput(testInput);
            testButton.click();

            expect(resultOutput.text()).toBe("true");
        });
        it("should run a FALSE test", function () {
            thenInput.val(" ");
            fireInput(thenInput);
            element("#button-add-then").click();

            testInput.val("g");
            fireInput(testInput);
            testButton.click();

            expect(resultOutput.text()).toBe("false");
        });
    });

});