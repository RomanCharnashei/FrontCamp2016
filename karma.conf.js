// Karma configuration
// Generated on Mon Feb 06 2017 17:31:46 GMT+0300 (Belarus Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'sinon', 'browserify'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular/angular.min.js',
      'node_modules/jasmine-sinon/lib/jasmine-sinon.js',
      'node_modules/angular-mocks/angular-mocks.js',      
      'client_src/helpers.js',
      'client_src/**/*_spec.js',
      'client_src/app.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'client_src/**/*_spec.js': ['browserify'],
      'client_src/app.js': ['browserify'],
      'client_src/**/!(*_spec).js': ['coverage']
    },



    browserify: {

      transform: [
          ['stringify', { includeExtensions: ['.html'] }], 
          'browserify-ngannotate', 
          ['browserify-conditionalify', { definitions: { isNotTesting: false } }]
        ]

    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type: 'html',
      dir: 'client_src/coverage/'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
