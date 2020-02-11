// PLEASE NOTE THIS FILE NOW REQUIRES GULP V4
// https://www.liquidlight.co.uk/blog/how-do-i-update-to-gulp-4/

// to stop npm EACCESS errors install npm this way:
// https://github.com/nvm-sh/nvm



var gulp        = require('gulp');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var gp_rename   = require("gulp-rename");
var gutil       = require('gulp-util');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var minifyCss   = require('gulp-clean-css');
var hasher      = require('gulp-hasher');
var buster      = require('gulp-cache-buster');
var replace     = require('gulp-replace');

  

gulp.task('cache',  function() {
  return gulp.src('layouts/main.twig')
    .pipe(buster({
      tokenRegExp: /\/(concat\.min\.css)\?v=[0-9a-z]+/,
      assetRoot: __dirname + '/static/css/',
      hashes: hasher.hashes,
    }))
    .pipe(gulp.dest('layouts/'));
});

gulp.task('jscache', function () {
  var filename = '_javascript-temp.twig';

  gulp.src('layouts/partials/_javascript.twig')
      .pipe(concat(filename))
      .pipe(gulp.dest('layouts/partials/'));

  return gulp.src('layouts/partials/_javascript.twig', { base: './' }) //must define base so I can overwrite the src file below. Per http://stackoverflow.com/questions/22418799/can-gulp-overwrite-all-src-files
      .pipe(replace(/(\/static\/js\/scripts\.js)\?v(er)*=[0-9a-z.]+/g, '/static/js/scripts.js?ver=' + Math.floor(Math.random() * 10000000).toString(16)))  //so find the script tag with an id of bundle, and replace its src.
      .pipe(gulp.dest('./')); //Write the file back to the same spot.
});


// https://medium.com/@felipebernardes/solving-browser-cache-hell-with-gulp-rev-6349a293abb9
// gulp.task("revision:rename", function() {
//   gulp.src(["./static/css/concat.min.css"])
//   .pipe(rev())
//   .pipe(revdel())
//   .pipe(gulp.dest("./static/css"))
//   .pipe(rev.manifest({ path: "manifest.json" }))
//   .pipe(gulp.dest("./static/css"))
// });

// gulp.task("revision:updateReferences", function() {
//    gulp.src(["manifest.json","./static/css/*.json"])
//    .pipe(collect())
//    .pipe(gulp.dest("./static/css"))
// });




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
        './assets/scripts/plugins/jquery.fancybox/source/jquery.fancybox.css',
        './assets/scripts/plugins/jquery.noty-2.3.8/demo/animate.css',
        './assets/scripts/sdk/media-player/mediaelementplayer.css',
        './assets/scripts/plugins/owl.carousel.min.css',
        './assets/scripts/plugins/owl.theme.default.css'

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





gulp.task('scripts', function(){
    return gulp.src([
        './bower_components/jquery/dist/jquery.js',
        './bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
        // './bower_components/swiper/dist/js/swiper.jquery.js',
        
        './assets/scripts/plugins/slick.js',
        './assets/scripts/plugins/jquery-ui/jquery-ui-1.10.1.custom.min.js',
        './assets/scripts/plugins/bootstrap-modalmanager.js',
        './assets/scripts/plugins/bootstrap-modal.js',
        './assets/scripts/plugins/jquery.noty-2.3.8/js/noty/packaged/jquery.noty.packaged.min.js',
        './assets/scripts/plugins/jquery.fancybox/source/jquery.fancybox.js',
        './assets/scripts/plugins/bootbox.min.js',
        './assets/scripts/plugins/jquery.validate/jquery.validate.min.js',
        './assets/scripts/plugins/waypoint/lib/jquery.waypoints.min.js',
        './assets/scripts/plugins/handlebars-v4.0.5.js',
        './assets/scripts/plugins/jquery.lazyload.min.js',
        './assets/scripts/plugins/jquery.dotdotdot.min.js',
        './assets/scripts/plugins/owl.carousel.min.js',
        // './assets/scripts/plugins/owl.carousel2.thumbs.js',

        './assets/scripts/sdk/cloudinary/jquery.cloudinary.js',
        './assets/scripts/sdk/common.js',
        './assets/scripts/sdk/blog.js',
        './assets/scripts/sdk/blog_new.js',
        './assets/scripts/sdk/article.js',
        './assets/scripts/sdk/search.js',
        './assets/scripts/sdk/disqus.js',
        './assets/scripts/sdk/video-player.js',
        './assets/scripts/sdk/user-articles.js',
        './assets/scripts/sdk/follow.js',
        './assets/scripts/sdk/login.js',
        './assets/scripts/sdk/image.js',
        './assets/scripts/sdk/social-share.js',
        './assets/scripts/sdk/yii/yii.js',
        './assets/scripts/sdk/yii/yii.captcha.js',
        './assets/scripts/sdk/uploadfile.js',
        './assets/scripts/sdk/media-player/mediaelement-and-player.min.js',


        './assets/scripts/framework.js',
        './assets/scripts/!(framework)*.js', // all files that end in .js EXCEPT common*.js


        // './assets/scripts/*.js',
        ])
        .pipe(concat('concat.js'))
        .pipe(gulp.dest('./static/js'))
        .pipe(gp_rename('scripts.js'))
        .pipe(uglify().on('error', function(err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString())
        }))
        .pipe(gulp.dest('./static/js'));

});



gulp.task('watch', function (){
    gulp.watch('./assets/styles/**/*.scss', ['styles']);
    gulp.watch('./assets/scripts/**/*.js', ['scripts']);
});

gulp.task('styles', gulp.series('sass', 'concat', 'minify-css', 'cache',  'jscache', function (done) {
  done();
}));


gulp.task('default', gulp.parallel('scripts', 'styles'));