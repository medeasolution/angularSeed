var gulp = require('gulp');
var bower = require('bower');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var cleanCSS = require('gulp-clean-css');
var minifyHtml = require("gulp-minify-html");
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var sh = require('shelljs');
var rjs = require('gulp-requirejs');
var image = require('gulp-image');
var removeHtmlComments = require('gulp-remove-html-comments');
var minify = require('gulp-minify');
var open = require('gulp-open');

var paths = {
    sass: ['./scss/**/*.scss']
};
gulp.task('sass', ['install'], function(done) {
    gulp.src('./scss/app.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('combine-css', ['sass'], function(done){
    gulp.src(['./www/css/app.css', './www/lib/angular-bootstrap/ui-bootstrap-csp.css', './www/lib/simple-line-icons/css/simple-line-icons.css'])
        .pipe(cleanCSS())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./www/css'))
        .on('end', done);
});

gulp.task('copy-fonts', ['install'], function(cb){
    gulp.src(['./www/lib/font-awesome-sass/assets/fonts/**/*']).pipe(gulp.dest('./www/fonts'));
    gulp.src(['./www/lib/simple-line-icons/fonts/**/*']).pipe(gulp.dest('./www/fonts'));
    gulp.src(['./www/lib/bootstrap-sass/assets/fonts/**/*']).pipe(gulp.dest('./www/fonts'));
    cb();
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['combine-css']);
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


gulp.task('dist-copy-optimize-images', ['install'], function(done){
    gulp.src('./www/img/**/*')
        .pipe(image())
        .pipe(gulp.dest('dist/img'))
        .on('end', done)
        .on('error', done);
});

gulp.task('dist-copy-templates', ['install'], function(done){
    gulp.src('./www/templates/**/*.html')
        .pipe(minifyHtml())
        .pipe(removeHtmlComments())
        .pipe(gulp.dest('dist/templates'))
        .on('end', done)
        .on('error', done);
});

gulp.task('dist-copy-files', ['copy-fonts', 'combine-css'], function(){
    gulp.src(['./www/css/style.css']).pipe(gulp.dest('dist/css'));
    gulp.src(['./www/fonts/**/*']).pipe(gulp.dest('dist/fonts'));
    gulp.src(['./www/index.html'])
        .pipe(minifyHtml())
        .pipe(removeHtmlComments())
        .pipe(gulp.dest('dist'));
    gulp.src(['./www/main.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
    gulp.src(['./www/lib/requirejs/require.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/lib/requirejs'));
});

gulp.task('dist-generate-jsbundle', ['install'], function(){
    rjs({
        baseUrl: 'www/app',
        mainConfigFile: 'www/main.js',
        name: "boot",
        out: "app/boot.js"
    })
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});


gulp.task('connect', function () {
    connect.server({
        root: 'www',
        port: 8050
    });

    gulp.src(__filename)
        .pipe(open({uri: 'http://localhost:8050'}));
});


gulp.task('generate-dist', ['dist-copy-files',  'dist-copy-templates', 'dist-copy-optimize-images', 'dist-generate-jsbundle']);

gulp.task('compile-all', ['git-check', 'install', 'sass', 'combine-css', 'copy-fonts']);

gulp.task('serve', ['compile-all', 'watch', 'connect']);

gulp.task('dist', ['compile-all', 'generate-dist']);

gulp.task('default', ['serve']);