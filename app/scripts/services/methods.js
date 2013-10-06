'use strict';

var regexApp = angular.module('ngRegexApp');

regexApp.factory('Methods', function() {

    var methods =  {
            "_then"        : { name: 'Then:',     method: "then",      type: "input", input: true, listSortOrder: 1}, //test √
            "_maybe"       : { name: 'Maybe:',    method: "maybe",     type: "input", input: true, listSortOrder: 2}, //test √
            "_anyOf"       : { name: 'Any of these:',   method: "anyOf",     type: "input", input: true, listSortOrder: 3}, // test √
            "_anythingBut" : { name: 'NOT any of these', method: "anythingBut", type: "input", input: true, listSortOrder: 4 }, // test √
            "_range"       : { name: 'Range',    method: 'range',     type: "range", input: false, range: true, listSortOrder: 5, errorMsg: "You can't do that with the Range input." }, //test √
            "_numMatches"  : { name: '# Matches',     method: 'numMatches', rangeOptional: true, type: "range",  range: true, input: false, listSortOrder: 6, errorMsg: "Sorry, you can't do that."  },
            "_startOfLine" : { name: 'Start of Line',  method: "startOfLine", type: "modifier", input: false, listSortOrder: 7 }, //test √
            "_withAnyCase" : { name: 'With Any Case',  method: "withAnyCase", type: "modifier", input: false, listSortOrder: 8 }, //test √
            "_endOfLine"   : { name: 'End of Line',    method: 'endOfLine',   type: "modifier", input: false, listSortOrder: 9 }, //test √
//            "manyOf"      : { name: 'Many Of',  method: "manyOf",    type: "input", input: true }, // t
            "_or"          : { name: 'Or',       method: "or",       type: "single", input: false, listSortOrder: 10 }, //test √
            "_space"       : { name: 'Space',    method: "then",     type: "single", input: false, defaultParam: " ", listSortOrder: 11},
            "_anything"    : { name: 'Anything', method: "anything", type: "single", input: false, listSortOrder: 12 }, // test √
//            "tab"         : { name: 'Tab',      method: 'tab',      type: "bool", input: false },
            "_word"        : { name: 'Word',     method: 'word',     type: "single", input: false, listSortOrder: 13 }
    };

    return methods;
});