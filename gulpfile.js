var gulp = require ('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gp_rename = require("gulp-rename");
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', function() {
    return gulp.src('./assets/styles/**/*.scss')
		.pipe(sourcemaps.init())
    	.pipe(sass({includePaths: ['./assets/styles/partials']}).on('error', sass.logError))
    	.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./static/css'));
});

gulp.task('scripts', function(){
	return gulp.src([
		'./bower_components/jquery/dist/jquery.js',
		'./bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
		'./bower_components/swiper/dist/js/swiper.jquery.js',
		'./assets/scripts/scripts.js',
		])
		.pipe(concat('concat.js'))
		.pipe(gulp.dest('./static/js'))
		.pipe(gp_rename('scripts.js'))
		.pipe(uglify().on('error', gutil.log))
		.pipe(gulp.dest('./static/js'));
});

gulp.task('watch', function (){
	gulp.watch('./assets/styles/**/*.scss', ['styles']);
	gulp.watch('./assets/scripts/**/*.js', ['scripts']);
});

gulp.task('default', ['scripts','styles']);