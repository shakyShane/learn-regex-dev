'use strict';

describe('Service: Methods', function () {

    // load the controller's module
    beforeEach(module('ngRegexApp'));

    var methods,
            scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, Methods) {
        scope = $rootScope.$new();
        methods = Methods;
    }));

    it('Returns an array of objects', function () {
//        expect(methods.length).toBeDefined();
//        expect(typeof methods[0] === "object").toBeTruthy();
//        expect(typeof methods[0].name).toBeDefined();
    });

});