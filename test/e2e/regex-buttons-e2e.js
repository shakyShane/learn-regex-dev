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

    beforeEach(function() {
        browser().navigateTo('/index.html');
    });

    it("should render a button for each regex section added", function () {

        var input = element('#input-then');
        input.val("shane");
        fireInput(input);
        element("#button-add-then").click();

        input = element('#input-maybe');
        input.val("kittie");
        fireInput(input);
        element("#button-add-maybe").click();

        expect(repeater('#btn-container .regex-btn').count()).toBe(2);

    });

    it('should display the given param if method accepts one', function () {
        var input = element('#input-then');
        input.val("shane");
        fireInput(input);
        element("#button-add-then").click();

        expect(element("#btn-container .regex-btn:first .section-param").text()).toBe('shane');
    });

    it('should not display anything after the method name if it does not support params', function () {
        element("#button-add-startOfLine").click();
        expect(element("#btn-container .regex-btn").count()).toBe(1);
        expect(element("#btn-container .regex-btn:first .section-param").text()).toBe('');
    });

    it('should correctly display the range input params', function () {

        element("#range-input-01").val("a");
        element("#range-input-02").val("z");
        fireInput(element("#range-input-01"));
        fireInput(element("#range-input-02"));
        var button = element("#button-add-range");
        button.click();

        expect(element("#btn-container .regex-btn").count()).toBe(1);
        expect(element("#btn-container .regex-btn:first .section-param").text()).toBe('a-z');
    });

    it('should correctly display the range input params (test 2)', function () {

        element("#range-input-01").val("0");
        element("#range-input-02").val("9");
        fireInput(element("#range-input-01"));
        fireInput(element("#range-input-02"));
        var button = element("#button-add-range");
        button.click();

        expect(element("#btn-container .regex-btn").count()).toBe(1);
        expect(element("#btn-container .regex-btn:first .section-param").text()).toBe('0-9');

        element("#range-input-01").val("5");
        element("#range-input-02").val("6");
        fireInput(element("#range-input-01"));
        fireInput(element("#range-input-02"));
        var button = element("#button-add-range");
        button.click();

        expect(element("#btn-container .regex-btn").count()).toBe(2);
        expect(element("#btn-container .regex-btn:nth-child(2) .section-param").text()).toBe('5-6');
    });

    it("should remove a section when the remove button is clicked", function () {
        element("#button-add-startOfLine").click();
        expect(element("#btn-container .regex-btn").count()).toBe(1);

        element("#btn-container .regex-btn:first .remove-btn").click();
        expect(element("#btn-container .regex-btn").count()).toBe(0);
    });

    it("should remove a section when the remove button is clicked & there are multiple other buttons", function () {
        element("#button-add-startOfLine").click();
        element("#button-add-withAnyCase").click();
        expect(element("#btn-container .regex-btn").count()).toBe(2);

        var input = element('#input-then');
        input.val("shane");
        fireInput(input);
        element("#button-add-then").click();
        expect(element("#btn-container .regex-btn").count()).toBe(3);

        element("#btn-container .regex-btn:first .remove-btn").click();
        expect(element("#btn-container .regex-btn").count()).toBe(2);
    });

});