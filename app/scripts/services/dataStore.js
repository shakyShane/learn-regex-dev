var regexApp = angular.module('ngRegexApp');

regexApp.service('DataStore', function() {
    return {
        regexSections: [],
        regex: 'var tester = new RegExp();',
        sh_regex: '//gm',
        sh_regex_code: '//gm.test("")',
        regex_starter_code: "var tester = new RegExp();",
        js_code: "VerEx()",
        js_starter_code: "VerEx()",
        regexTestCode: 'tester.test();',
        result: "n/a",
        errorMessage: "",
        test: "Default",
        testString: "",
        shorthandRegex: ""

    }
});
