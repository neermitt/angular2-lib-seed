var gulp = require('gulp');
var traceur = require('gulp-traceur');
var connect = require('gulp-connect');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var TRACEUR_OPTIONS = require('./config').traceur;
var PATH = {
    SRC: './src/**/*.ats',
    EXAMPLES: './examples/**/*.ats',
    SASS: './src/**/*.scss'
};


// TRANSPILE AT SCRIPT
gulp.task('build.src', function() {
    gulp.src(PATH.SRC)
        .pipe(traceur(TRACEUR_OPTIONS))
        .pipe(rename({extname: '.js'}))
        .pipe(gulp.dest('build/src'));
});

// TRANSPILE AT SCRIPT
gulp.task('build.examples', function() {
    gulp.src(PATH.EXAMPLES)
        .pipe(traceur(TRACEUR_OPTIONS))
        .pipe(rename({extname: '.js'}))
        .pipe(gulp.dest('build/examples'));
});


// Compile SASS
gulp.task('build.src.css', function() {
    gulp.src(PATH.SASS)
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('build/src'));
});


gulp.task('build', ['build.src', 'build.examples', 'build.src.css']);


// WATCH FILES FOR CHANGES
gulp.task('watch', function() {
    gulp.watch(PATH.SRC, ['build']);
});


// WEB SERVER
gulp.task('serve', function() {
    connect.server({
        root: [__dirname, './examples'],
        port: 8000,
        livereload: false
    });
});


gulp.task('default', ['serve', 'watch']);