var gulp = require('gulp');
var typescript = require('gulp-typescript');
var connect = require('gulp-connect');
var rename = require('gulp-rename');
var bundler = require('./tools/build/bundle');

var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge2');

var typescriptOptions = require('./config').typescript;

typescriptOptions.es5.typescript = require('typescript');
typescriptOptions.es6.typescript = require('typescript');

var CONFIG = {
  src: {
    main: './src/**/*.ts',
    example: './examples/**/*.ts'
  },
  dest: {
    js: {
      dev: {
        es5: 'dist/js/dev/es5',
        es6: 'dist/js/dev/es6'
      }
    },
    build: 'dist/build',
    example: 'dist/example',
    bundle: {
      paths: {
        "*": "dist/js/dev/es6/*.es6",
        "angular2/*": "node_modules/angular2/es6/prod/*.es6",
        "rx": "node_modules/angular2/node_modules/rx/dist/rx.js"
      },
      map: {

      }
    }
  }
};


// TRANSPILE TYPESCRIPT
gulp.task('build.src.js.es5', function () {
  return gulp.src(['typings/**/*.d.ts', CONFIG.src.main])
    .pipe(typescript(typescriptOptions.es5, undefined, typescript.reporter.fullReporter(true)))
    .pipe(gulp.dest(CONFIG.dest.js.dev.es5));
});

gulp.task('build.src.js.es6', function () {
  return gulp.src(['typings/**/*.d.ts', CONFIG.src.main])
    .pipe(typescript(typescriptOptions.es6, undefined, typescript.reporter.fullReporter(true)))
    .pipe(rename(function (file) {
      file.extname = file.extname.replace('.js', '.es6');
    }))
    .pipe(gulp.dest(CONFIG.dest.js.dev.es6));
});

gulp.task('build.src.js', ['build.src.js.es5', 'build.src.js.es6']);


// production build
gulp.task('bundle.js.dev', ['build.src.js.es6'], function () {
  return bundler.bundle(
    CONFIG.dest.bundle,
    'my-components - angular2/angular2',
    './dist/build/my-components.dev.js',
    {
      sourceMaps: true
    });
});

// TRANSPILE TYPESCRIPT
gulp.task('build.example.js', ['bundle.js.dev'], function () {
  gulp.src(['typings/**/*.d.ts', 'src/**/*.d.ts', CONFIG.src.example])
    .pipe(typescript(typescriptOptions.es5, undefined, typescript.reporter.fullReporter(true)))
    .pipe(gulp.dest(CONFIG.dest.example));
});


gulp.task('build', ['build.src.js', 'build.example.js']);


// WATCH FILES FOR CHANGES
gulp.task('watch', function () {
  gulp.watch(CONFIG.src.main, ['build.src.js']);
  gulp.watch(CONFIG.src.example, ['build.src.example']);
});


// WEB SERVER
gulp.task('serve', ['build.example.js'], function () {
  connect.server({
    root: [CONFIG.dest.build, CONFIG.dest.example, 'examples/', 'dist/'],
    port: 9000,
    livereload: false
  });
});


gulp.task('default', ['serve', 'watch']);
