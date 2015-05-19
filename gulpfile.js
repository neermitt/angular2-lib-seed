var gulp = require('gulp');
var typescript = require('gulp-typescript');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

var typescriptOptions = require('./config').typescript;

typescriptOptions.typescript = require('typescript');

var CONFIG = {
  src: {
    main: './src/**/*.ts',
    example: './examples/**/*.ts',
    sass: './src/**/*.scss'
  },
  dest: {
    js: {
      all: 'dist/js',
      dev: {
        es6: 'dist/js/dev/es6',
        es5: 'dist/js/dev/es5'
      },
      prod: {
        es6: 'dist/js/prod/es6',
        es5: 'dist/js/prod/es5'
      },
      cjs: 'dist/js/cjs',
      dart2js: 'dist/js/dart2js'
    },
    dart: 'dist/dart'
  }
};



// TRANSPILE TYPESCRIPT
gulp.task('build.src.js', function () {
  gulp.src(CONFIG.src.main)
    .pipe(sourcemaps.init())
    .pipe(typescript(typescriptOptions))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(CONFIG.dest.js.dev.es5 + '/src'));
});

gulp.task('build.src.examples', function () {
  gulp.src(CONFIG.src.example)
    .pipe(sourcemaps.init())
    .pipe(typescript(typescriptOptions))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(CONFIG.dest.js.dev.es5 + '/examples'));
});


// Compile SASS
gulp.task('build.src.css', function () {
  gulp.src(CONFIG.src.sass)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest(CONFIG.dest.js.dev.es5));
});


gulp.task('build', ['build.src.js', 'build.src.examples', 'build.src.css']);


// WATCH FILES FOR CHANGES
gulp.task('watch', function () {
  gulp.watch(CONFIG.src.main, ['build']);
});


// WEB SERVER
gulp.task('serve', function () {
  connect.server({
    root: [__dirname, './examples'],
    port: 8000,
    livereload: false
  });
});


gulp.task('default', ['serve', 'watch']);
