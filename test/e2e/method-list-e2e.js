'use strict';

describe('Methods List E2E', function () {

    beforeEach(function() {
        browser().navigateTo('/index.html');
    });

    it('should render all methods', function () {
        expect(repeater('#method-list .regex-section').count()).toBe(13); // 10 methods + 1 heading
    });

    it('should render input boxes for methods that require it', function () {
        expect(repeater('#method-list .method-input').count()).toBe(4);
    });

    it("should render the range Div", function () {
        expect(repeater('#method-list .range-input').count()).toBe(2);
    });

    it("should render the add button for range input", function () {
        expect(repeater('#method-list #button-add-range').count()).toBe(1);
    });

    it("should render a button for each method", function () {
        expect(repeater('#method-list .method-add').count()).toBe(11);
    });

});
