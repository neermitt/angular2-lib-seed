// Karma configuration
// Generated on Fri Mar 14 2014 15:01:19 GMT-0700 (PDT)

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      // angular

      // zone-microtask must be included first as it contains a Promise monkey patch
      'node_modules/angular2/node_modules/zone.js/dist/zone-microtask.js',
      'node_modules/angular2/node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/angular2/node_modules/traceur/bin/traceur-runtime.js',
      'node_modules/systemjs/node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.src.js',

      // Including systemjs because it defines `__eval`, which produces correct stack traces.
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/systemjs/lib/extension-register.js',
      'node_modules/systemjs/lib/extension-cjs.js',
      'node_modules/angular2/node_modules/rx/dist/rx.js',
      'node_modules/reflect-metadata/Reflect.js',


      {pattern: 'node_modules/angular2/**/*.js', included: false},


      'tools/build/file2modulename.js',
      // The entry point that dynamically imports all the specs.
      {pattern: 'test/main.js', included: true},

      // All the specs and sources are included dynamically from `test/main.js`.
      {pattern: 'src/**/*.ts', included: false},
      {pattern: 'test/**/*.ts', included: false}
    ],

    preprocessors: {
      '**/*.ts': ['typescript']
    },

    browsers: ['Chrome'],
    logLevel: config.LOG_DEBUG,

    typescriptPreprocessor: {
      options: {
        sourceMap: true, // (optional) Generates corresponding .map file.
        target: 'ES5', // (optional) Specify ECMAScript target version: 'ES3' (default), or 'ES5'
        module: 'commonjs', // (optional) Specify module code generation: 'commonjs' or 'amd'
        noImplicitAny: true, // (optional) Warn on expressions and declarations with an implied 'any' type.
        noResolve: true, // (optional) Skip resolution and preprocessing.
        removeComments: true // (optional) Do not emit comments to output.
      },
      typings: [
        'typings/tsd.d.ts',
        'typings/angular2/angular2.d.ts',
        'typings/jasmine/jasmine.d.ts'
      ]
    },

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-typescript-preprocessor'
    ]
  });
};
