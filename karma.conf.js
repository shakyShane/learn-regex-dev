// Karma configuration

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files : [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/verbalexpressions/VerbalExpressions.js',
            'app/scripts/*.js',
            'app/scripts/**/*.js',
            'test/mock/**/*.js',
            'test/spec/**/*.js'
        ],
        exclude: [],
        reporters: ['dots'],
        port: 8080,
        runnerPort: 9100,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        captureTimeout: 5000,
        singleRun: false

    });
};

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
