// PLEASE NOTE THIS FILE NOW REQUIRES GULP V4
// https://www.liquidlight.co.uk/blog/how-do-i-update-to-gulp-4/

// to stop npm EACCESS errors install npm this way:
// https://github.com/nvm-sh/nvm



var gulp        = require('gulp');
var concat      = require('gulp-concat');
// var webpack     = require('webpack-stream');
var uglify      = require('gulp-uglify');
var gp_rename   = require("gulp-rename");
var gutil       = require('gulp-util');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var minifyCss   = require('gulp-clean-css');
var hasher      = require('gulp-hasher');
var buster      = require('gulp-cache-buster');
var terser      = require('gulp-terser');

// // var replace     = require('gulp-replace');


gulp.task('jscache',  function() {
    return gulp.src('layouts/partials/_javascript.twig')
    .pipe(buster({
        tokenRegExp: /\/(js\/scripts\.js)\?v=[0-9a-z]+/,
        assetRoot: __dirname + '/static/',
        hashes: hasher.hashes,
    }))
    .pipe(gulp.dest('layouts/partials/'));
});



gulp.task('cache',  function() {
    return gulp.src('layouts/main.twig')
    .pipe(buster({
        tokenRegExp: /\/(concat\.min\.css)\?v=[0-9a-z]+/,
        assetRoot: __dirname + '/static/css/',
        hashes: hasher.hashes,
    }))
    .pipe(gulp.dest('layouts/'));
});


gulp.task('minify-css', function () {
    return gulp.src([
        './static/css/concat.css',
    ]) 
    .pipe(gp_rename({suffix: '.min'}))
    .pipe(minifyCss())
    .pipe(gulp.dest('./static/css'))
    .pipe(hasher());
});


gulp.task('concat', function () {
    return gulp.src([
        './static/css/main.css',
        // './assets/js_wp/vendor/jquery.fancybox/source/jquery.fancybox.css',
        // './assets/js_wp/vendor/jquery.noty-2.3.8/demo/animate.css',
        // './assets/js_wp/sdk/media-player/mediaelementplayer.css',
        './assets/js_wp/vendor/owl.carousel.min.css',
        './assets/js_wp/vendor/owl.theme.default.css'

    ]) // path to your file
    .pipe(concat('concat.css'))
    .pipe(gulp.dest('./static/css'));
});


gulp.task('sass', function() {
    return gulp.src([
            './assets/styles/main.scss',
        ])
        .pipe(sourcemaps.init())
        .pipe(sass({includePaths: [
            './assets/styles/partials', 
        ]}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./static/css'));
});





gulp.task('scripts-concat', function(){
    return gulp.src([
        './assets/js_wp/vendor/jquery3.6.js',
        './assets/js_wp/vendor/waypoint/lib/jquery.waypoints.min.js',
        './assets/js_wp/vendor/jquery.lazyload.min.js',
        './assets/js_wp/vendor/jquery.dotdotdot.min.js',
        './assets/js_wp/vendor/owl.carousel.min.js',
        './assets/js_wp/scripts.js',
        './assets/scripts/sdk/yii/yii.js',
        ])
        .pipe(concat('concat.js'))
        .pipe(gulp.dest('./static/js'))
        .pipe(gp_rename('vendor.js'))
        .pipe(terser())
        // .pipe(uglify().on('error', function(err) {
        //     gutil.log(gutil.colors.red('[Error]'), err.toString())
        // }))
        .pipe(gulp.dest('./static/js'))
        .pipe(hasher());        

});



gulp.task('watch', function (){
    gulp.watch('./assets/styles/**/*.scss', ['styles']);
    gulp.watch('./assets/scripts/**/*.js', ['scripts']);
});

gulp.task('styles', gulp.series('sass', 'concat', 'minify-css', 'cache', function (done) {
    done();
}));

gulp.task('scripts', gulp.series('scripts-concat', 'jscache', function (done) {
    done();
}));


gulp.task('default', gulp.parallel('scripts', 'styles'));