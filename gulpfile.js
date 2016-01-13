var gulp = require('gulp'),
        sass = require('gulp-sass'),
        autoprefixer = require('gulp-autoprefixer'),
        minifycss = require('gulp-minify-css'),
        rename = require('gulp-rename'),
        jade = require('gulp-jade'),
        uglify = require('gulp-uglify'),
        spritesmith = require('gulp.spritesmith'),
        concat = require('gulp-concat');

const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');



var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
    tinylr.listen(35729);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

// Styles
gulp.task('styles', function() {
  return gulp.src('assets/sass/all.scss')
    .pipe(sass({ style: 'expanded', }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/assets/stylesheets'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/stylesheets'));
});

//Make Sprites
gulp.task('sprite', function() {
    var spriteData = 
        gulp.src('assets/images/icons/*.*') // source path of the sprite images
            .pipe(spritesmith({
                imgName: '../sprite.png',
                cssName: 'sprite.scss',
            }));

    spriteData.img.pipe(gulp.dest('dist/assets/images/')); // output path for the sprite
    spriteData.css.pipe(gulp.dest('assets/sass/lib/')); // output path for the CSS
});

//Imagemin
gulp.task('image', () => {
  return gulp.src('assets/images/**/*.*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/assets/images'));
});

//Jade
gulp.task('jade', function() {
  var YOUR_LOCALS = {};
  return gulp.src('*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('dist/'));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src(['assets/javascripts/jquery.js','assets/javascripts/modernizr-custom.js','assets/javascripts/viewport.js','assets/javascripts/slidebars.min.js','assets/javascripts/jquery.sticky.js','assets/javascripts/jquery.bxslider.min.js','assets/javascripts/jquery.magnific-popup.min.js','assets/javascripts/all.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/assets/javascripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/javascripts'));
});


gulp.task('watch', function() {
  gulp.watch('assets/javascripts/**/*.js', ['scripts']);
  gulp.watch('assets/sass/**/*.scss', ['styles']);
  gulp.watch('**/*.jade', ['jade']);
  gulp.watch('dist/*.html', notifyLiveReload);
  gulp.watch('dist/assets/stylesheets/**/*.css', notifyLiveReload);
});

gulp.task('default', ['jade', 'scripts','image', 'styles', 'sprite', 'livereload', 'watch'], function() {

});