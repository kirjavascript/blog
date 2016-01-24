var gulp = require('gulp');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var babel = require("gulp-babel");
var removeHtmlComments = require('gulp-remove-html-comments');
var plumber = require('gulp-plumber');

var build_dir = 'build/';

// concatenate styles, convert to CSS
gulp.task('styles', function() {
    var injectOpt = {
        starttag: '// inject:scss',
        endtag: '// endinject',
        addRootSlash: false
    };

    return gulp.src(['src/styles/_main.scss'])
        .pipe(plumber())
        // inject scss files that don't start with _
        .pipe(inject(gulp.src(['src/styles/*.scss','!src/styles/_*.scss']), injectOpt))
        .pipe(concat('main.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(build_dir + 'css'))
});

// concatenate scripts, convert to ES5 and minify
gulp.task('scripts', function() {
    return gulp.src(['src/js/*.js'])
        .pipe(plumber()) // handle JS errors
        .pipe(babel({presets: ['es2015']})) // ES6
        .pipe(concat('main.js'))
        .on('error', function(err){ console.log(err.message); })
        //.pipe(uglify())
        .pipe(gulp.dest(build_dir + 'js'))
});


// build html
function html() {
    var ipaths = ['src', build_dir]; // paths to ignore when injecting
    return gulp.src('src/index.{html,php}')
        .pipe(removeHtmlComments())
        .pipe(gulp.dest(build_dir))
}

// inject styles / scripts and write to build folder
gulp.task('build', ['styles', 'scripts', 'json'], function() {

    // uncomment this for copying static data
    gulp.src('src/svg/*').pipe(gulp.dest(build_dir + 'svg'));

    //copy d3 to js folder
    gulp.src('node_modules/d3/d3.min.js').pipe(gulp.dest(build_dir + 'js'));
    gulp.src('node_modules/ace-editor-builds/src-min/**/*').pipe(gulp.dest(build_dir + 'js/ace'));

    return html();
})

// inject styles / scripts and write to build folder
gulp.task('json', function() {

    // uncomment this for copying static data
    gulp.src('src/json/**/*').pipe(gulp.dest(build_dir + 'json'));

    return html();
})

// watch files for edits and rebuild if so
gulp.task('watch', ['build'], function() {
    gulp.watch(['src/**/*.scss'], ['styles']);
    gulp.watch(['src/js/*.js'], ['scripts']);
    gulp.watch(['src/**/*.{html,php}'], ['build']);
    gulp.watch(['src/**/*.svg'], ['build']);
    gulp.watch(['src/json/**/*'], ['json']);
});

gulp.task('default', ['watch']);

// for clean js output
gulp.task('debug', function() {
    return gulp.src(['src/js/*.js'])
        .pipe(plumber())
        .pipe(babel({presets: ['es2015']})) // ES6
        .pipe(concat('main.js'))
        .on('error', function(err){ console.log(err.message); })
        .pipe(gulp.dest(build_dir + 'js'))
});
