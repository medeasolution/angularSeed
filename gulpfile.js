/*
 * Dependencias
 */
var gulp = require('gulp');
var bower = require('bower');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var minifyCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var sh = require('shelljs');
var rjs = require('gulp-requirejs');

var paths = {
    sass: ['./scss/**/*.scss']
};

gulp.task('sass', function(done) {
    gulp.src('./scss/app.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});

gulp.task('connect', function () {
    connect.server({
        root: 'www',
        port: 8050
    })
});

gulp.task('generate-dist', ['dist-copy-files', 'dist-generate-jsbundle']);

gulp.task('dist-copy-files', function(){
    gulp.src(['./www/css/**/*']).pipe(gulp.dest('dist/css'));
    gulp.src(['./www/templates/**/*']).pipe(gulp.dest('dist/templates'));
    gulp.src(['./www/index.html']).pipe(gulp.dest('dist'));
    gulp.src(['./www/main.js']).pipe(gulp.dest('dist'));
    gulp.src(['./www/lib/requirejs/require.js']).pipe(gulp.dest('dist/lib/requirejs'));
});

gulp.task('dist-generate-jsbundle', function(){
    rjs({
        baseUrl: 'www/app',
        mainConfigFile: 'www/main.js',
        name: "boot",
        out: "app/boot.js"
    }).pipe(gulp.dest('dist'));
});

gulp.task('serve', ['install', 'git-check', 'sass', 'watch', 'connect']);

gulp.task('dist', ['install', 'git-check', 'sass', 'generate-dist']);

gulp.task('default', ['serve']);