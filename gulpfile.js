
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
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
    })
});


gulp.task('generate-dist', ['dist-copy-files',  'dist-copy-templates', 'dist-copy-optimize-images', 'dist-generate-jsbundle']);

gulp.task('compile-all', ['git-check', 'install', 'sass', 'combine-css', 'copy-fonts']);

gulp.task('serve', ['compile-all', 'watch', 'connect']);

gulp.task('dist', ['compile-all', 'generate-dist']);

gulp.task('default', ['serve']);