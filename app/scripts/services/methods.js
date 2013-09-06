'use strict';

var regexApp = angular.module('ngRegexApp');

regexApp.factory('Methods', function() {

    var methods =  {
            "_then"        : { name: 'Then',     method: "then",      type: "input", input: true, listSortOrder: 1}, //test √
            "_maybe"       : { name: 'Maybe',    method: "maybe",     type: "input", input: true, listSortOrder: 2}, //test √
            "_anyOf"       : { name: 'Any Of',   method: "anyOf",     type: "input", input: true, listSortOrder: 3}, // test √
            "_range"       : { name: 'Range',    method: 'range',     type: "range", input: false, range: true, listSortOrder: 4 }, //test √
            "_startOfLine" : { name: 'Start of Line',  method: "startOfLine", type: "modifier", input: false, listSortOrder: 5 }, //test √
            "_withAnyCase" : { name: 'With Any Case',  method: "withAnyCase", type: "modifier", input: false, listSortOrder: 6 }, //test √
            "_endOfLine"   : { name: 'End of Line',    method: 'endOfLine',   type: "modifier", input: false, listSortOrder: 7 }, //test √
//            "manyOf"      : { name: 'Many Of',  method: "manyOf",    type: "input", input: true }, // t
            "_or"          : { name: 'Or',       method: "or",       type: "single", input: false, listSortOrder: 8 }, //test √
//            "space"       : { name: 'Space',    method: "then",     type: "bool", input: false, defaultParam: " " },
            "_anything"    : { name: 'Anything', method: "anything", type: "single", input: false, listSortOrder: 9 }, // test √
//            "tab"         : { name: 'Tab',      method: 'tab',      type: "bool", input: false },
            "_word"        : { name: 'Word',     method: 'word',     type: "single", input: false, listSortOrder: 10 }
    };

    var order = [

    ];
    return methods;
});