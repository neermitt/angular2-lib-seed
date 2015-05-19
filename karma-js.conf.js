// Karma configuration
// Generated on Fri Mar 14 2014 15:01:19 GMT-0700 (PDT)

var typescriptOptions = require('./config').typescript;

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'requirejs'],

    files: [
      // The entry point that dynamically imports all the specs.
      {pattern: 'test-main.js', included: true},

      // All the specs and sources are included dynamically from `test/main.js`.
      {pattern: 'src/**/*.ts', included: false},
      {pattern: 'test/**/*.ts', included: false}
    ],

    preprocessors: {
      '**/*.ts': ['typescript']
    },

    browsers: ['Chrome'],

    typescriptPreprocessor: {
      options: {
        sourceMap: true,
        module: 'amd'
      },
      typings: [
        'typings/tsd.d.ts',
        'typings/jasmine/jasmine.d.ts'
      ]
    },

    plugins: [
      'karma-jasmine',
      'karma-requirejs',
      'karma-chrome-launcher',
      'karma-typescript-preprocessor'
    ]
  });
};
