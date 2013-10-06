'use strict';

var regexApp = angular.module('ngRegexApp');

regexApp.factory('MethodService', function() {
    return {
        isDup: function (scope, method) {
            var isDup = false;

            angular.forEach(scope.regexSections, function (item, i) {
                if (item.method === method) {
                    isDup = true;
                }
            }, this);

            return isDup;

        },
        addSection: function (scope, method, param, param2) {

            if (method.type === "modifier") {
                // check if a modifier already exists
                if (this.isDup(scope, method.method)) return;
            }

            if (!this.verifyParam(method, param, param2)) return;
            param = this.transformParam(method, param, param2);

            this.addVerbalSection(scope, method, param);

            var lastAdded = this.setRegexSection(scope, method, param);

            var added = this.addRegexSection(scope, lastAdded);

            if (added) {
                this.resetInput(method);
                this.resetErrors(scope);
            }

        },
        resetErrors: function (scope) {
            scope.errorMessage = "";
        },
        resetInput: function (method) {
            if (method.type === "range") {

                method.inputVal1 = '';
                method.inputVal2 = '';
            }
            method.inputVal = '';
        },
        verifyParam: function (method, param, param2) {
            if (method.type === "input" && !param) {
                return false;
            }
            if (method.type === "range") {
                if (!method.rangeOptional) {
                    if (typeof param === "undefined" || typeof param2 === "undefined" ) {
                        return false;
                    } else {
                        if (typeof param === "undefined") return false;
                    }
                }
            }
            return true;
        },
        escapeStringForRegex: function (string) {

            if(string && typeof string === "string"){
                return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            }
            if (typeof string === "number") {
                return string;
            }
            return string;

        },
        buildShortHandCode: function (scope, shorthand, testString) {
            return shorthand;
        },
        buildRegex: function (scope, js_code, lastAdded) {

            try {
                var code = this.createRegexes(js_code);
            } catch (e) {
//                console.log(e);
                this.showError(scope, e, lastAdded);
                return false;
            }

            scope.sh_regex = this.buildShortHandCode(scope, code.shorthand, scope.testString);
            scope.sh_regex_code = this.getShorthandRegexTestCode(scope.sh_regex, scope.testString);

            var newcode = code.longhand.replace(/^\//, "");
            var modCodes = /[a-z]{1,4}$/.exec(newcode);

            newcode = newcode.replace(/\/[a-z]{1,4}$/, '');

            var output = 'var tester = new RegExp("' + newcode + '", "'+ modCodes +'");';
            return output;

        },
        showError: function (scope, e, lastAdded) {
            // remove a section
            var removedSection = this.removeSectionByHash(scope, lastAdded);
            if (removedSection) {
                scope.errorMessage = removedSection.errorMsg;
            }
        },
        addRegexSection: function (scope, lastAdded) {

            var regex = this.buildRegex(scope, scope.js_code, lastAdded);
            if (regex) {
                scope.regex = regex;
                return true;
            } else {
                return false;
            }
        },
        addVerbalSection: function (scope, method, param) {
            if (method.type == "modifier" || method.type == "single") {

                if (method.name === "Space") {
                    param = method.param = '" "';
                } else {
                    param = "";
                }
            }
            if (method.type == "input") {
                if (param === '\\"') {
                    param = '"\\""';
                } else {
                    param = '"' + param + '"';
                }
            }
            if (method.type == "range") {
                if (param.length === 2) {
                    param = '"' + param[0] +'", "' + param[1] + '"';
                } else {
                    param = '"' + param + '"';
                }
            }

            // Either append to exising JS code, or start from scratch
            if (!scope.js_code) {
                scope.js_code = this.js_starter_code + '.' + method.method + '('+ param +')';
            } else {
                scope.js_code += '.' + method.method + '('+ param +')';
            }
        },
        addOneVerbalSection: function (method, type, param) {

            if (type === "modifier" || type === "single") { // ensure no parameter are ever sent back when the type is bool.
                return '.' + method + '()'
            }

            if (type === "range") {
                var paramStrings = param.split("-");
                return '.' + method + '("' + paramStrings[0] +'", "' + paramStrings[1] + '")';
            }

            if (param === undefined || param === null) {
                param = "";
            } else {
                param = '"' + param + '"';
            }

            return '.' + method + '('+ param +')';
        },
        extractOrderFromDom: function (elems, scope) {
            var newOrder = [];
            elems.each(function (i) {
                var order = jQuery(this).attr('rel');

                angular.forEach(scope.regexSections, function (item, ii) {

                    if (item.$$hashKey === order) {
                        item.sortOrder = i;
                        newOrder.push(ii);
                    }
                });
            });
            return newOrder;
        },
        runTest: function (scope, testString) {
            var cleanTestString = this.escapeQuotes(testString);

            if (!testString || testString === "") {
                this.resetRegexTestCode(scope);
                this.resetShorthandRegexTestCode(scope);
                this.resetResult(scope);
                return false;
            }

            var resultCode = this.buildJsTestCode(scope.js_code, cleanTestString);
            var result = eval(resultCode);

            scope.regexTestCode = this.getRegexTestCode(cleanTestString);
            scope.sh_regex_code = this.getShorthandRegexTestCode(scope.sh_regex, cleanTestString);

            return scope.result = result;
        },
        resetRegexTestCode: function (scope) {
            scope.regexTestCode = this.initRegexTestCode();
        },
        resetShorthandRegexTestCode: function (scope) {
            scope.sh_regex_code = this.getShorthandRegexTestCode(scope.sh_regex, '');
        },
        resetResult: function (scope) {
            scope.result = 'n/a';
        },
        getRegexSections: function (scope) {
            return scope.regexSections || []; // return a blank array if it's the first run through
        },
        setParam: function (section, param) {
            if (angular.isArray(param) && section.type === "range") {
                return param.join("-");
            } else {
                return param;
            }
        },
        setRegexSection: function (scope, section, param) {

            var current = section;

            if (scope.regexSections.length === 0) {

                section.param = this.setParam(section, param);
                section.escapedParam = this.escapeStringForRegex(param);
                section.sortOrder = 0;
                scope.regexSections.push(section);

            } else {
                //check for duplicate buttons
                angular.forEach(scope.regexSections, function (item, i) {
                    if (current.$$hashKey === item.$$hashKey) {
                        section  = angular.copy(current);
                    }
                }, this);

                section.escapedParam = this.escapeStringForRegex(param);
                section.param = this.setParam(section, param);
                section.sortOrder = scope.regexSections.length;
                scope.regexSections.push(section);
            }

            return section.$$hashKey;

        },
        buildJsTestCode: function (js_code, testString) {

            var code = "var tester = " + js_code + '; tester.test("' + testString + '")';

            return code;
        },
        escapeQuotes: function (string) {
            if (typeof string === "string") {
                return string.replace(/"/g, '\\"');
            } else {
                return string;
            }

        },
        transformParam: function (method, param, param2) {

            if (method.type === "range") {
                if(method.rangeOptional) {
                    if (param && param2) {
                        return [this.cleanParam(param), this.cleanParam(param2)];
                    } else {
                        return this.cleanParam(param);
                    }
                } else {
                    return [this.cleanParam(param), this.cleanParam(param2)];
                }
            }

            if (method.name === "Space") {
                return " ";
            }

            var cleanParam = this.cleanParam(param);
            return cleanParam;
        },
        reorderSections: function (scope, regexSections, order) {
            angular.forEach(regexSections, function (item, i) {
                item.sortOrder = order[i];
            });
        },
        cleanParam: function (param) {

            if (typeof param === "number") {
                return param;
            }
            if (param === 0) {
                return param;
            }
            if (!param) {
                return "";
            }
            if (param.indexOf('"') !== -1) {
                // there's a quote, escape it
                return this.escapeQuotes(param);
            }
            return param;
        },
        addTestString: function (scope, string) {
            scope.testString = string;
            this.runTest(scope, string);
        },
        reset: function (scope, temp) {
            return this.resetUi(scope);
        },
        resetUi: function (scope) {

            scope.regexSections = [];
            scope.testString = "";
            scope.js_code = this.initJs();
            scope.regex = this.initRegex();
            scope.result = "n/a";
            scope.sh_regex = '';
            scope.sh_regex_code = this.initShorthandRegex();
            scope.regexTestCode = this.initRegexTestCode();

            return scope;
        },
        updateUi: function (scope) {
            scope.js_code = this.renderJsCode(scope.regexSections);
            scope.regex = this.buildRegex(scope, scope.js_code);
            this.runTest(scope, scope.testString);
        },
        /**
         * Remove a regex section and return the scope.
         * @param scope
         * @param index
         * @returns scope
         */
        removeSection: function (scope, index) {
            var sections = scope.regexSections.splice(index, 1);
            if (scope.regexSections.length > 0) {
                this.updateUi(scope);
            } else {
                this.resetUi(scope);
            }
            return scope;
        },
        removeSectionByHash: function (scope, hash) {

            var match;
            angular.forEach(scope.regexSections, function (item, i) {
                if (item.$$hashKey === hash) {
                    match = i;
                }
            });

            if (typeof match === "number") {
                var error = angular.copy(scope.regexSections[match]);
                this.removeSection(scope, match);
                return error;
            }

            return false;

        },
        renderJsCode: function (sections) {

            var string = '';

            this.getSections(sections).forEach(function (section) {
                string += this.addOneVerbalSection(section.method, section.type, section.param); // make sure the param returned is suitable.
            }, this);

            return this.js_starter_code + string;

        },
        renderRegexCode: function (scope, jsCode) {
            return this.buildRegex(scope, jsCode);
        },
        updateScope: function (scope, data) {
            scope.regex = data.regex;
            scope.regexSections = data.regexSections;
            scope.js_code = data.js_code;
            scope.regexTestCode = data.regexTestCode;
            scope.result = data.errorMessage;
        },
        getSections : function (sections) {
            return sections.sort(function(a, b){
                var a1= a.sortOrder, b1= b.sortOrder;
                if(a1== b1) return 0;
                return a1> b1? 1: -1;
            });
        },
        createRegexes: function (code) {

            var resultCode = eval(code);
            var newCode = resultCode.toString();
            var regexes = {};

            regexes.shorthand = newCode;

            if (newCode.indexOf('"') !== -1) {
                regexes.longhand = this.escapeQuotes(newCode);
            } else {
                regexes.longhand = newCode;
            }

            return regexes;
        },
        getRegexTestCode: function (testString) {

            var replaced = this.regexTestCode.replace("%s", testString);
            return replaced;
        },
        getShorthandRegexTestCode: function (shorthandRegex, testString) {

            var replaceCode = "%s2";

            if (testString === "") {
                replaceCode = '"%s2"';
            }

            var string = this.shorthandRegexCode
                    .replace("%s1", shorthandRegex)
                    .replace(replaceCode, testString);

            return string;
        },
        initJs: function () {
            return this.js_starter_code;
        },
        initRegex: function () {
            return this.regex_starter_code;
        },
        initRegexTestCode: function () {
            return this.regexTestCode.replace('"%s"', "");
        },
        initShorthandRegex: function () {
            return this.shorthandRegexCode.replace("%s1", "//gm").replace('"%s2"', "");
        },
        regex_starter_code: "var tester = new RegExp();",
        js_code: "VerEx()",
        js_starter_code: "VerEx()",
        regexTestCode: 'tester.test("%s");',
        shorthandRegexCode: '%s1.test("%s2")',
        result: "n/a",
        sharedProperties: ['js_code', 'regexTestCode', 'result', 'regexSections', 'regex']
    }
});