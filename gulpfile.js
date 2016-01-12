var gulp = require('gulp'),
        sass = require('gulp-sass'),
        autoprefixer = require('gulp-autoprefixer'),
        minifycss = require('gulp-minify-css'),
        rename = require('gulp-rename'),
        jade = require('gulp-jade'),
        uglify = require('gulp-uglify'),
        concat = require('gulp-concat');

gulp.task('express', function() {
  var server = require('./server');
});

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
  return gulp.src('dev/assets/javascripts/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('assets/javascripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('assets/javascripts'));
});


gulp.task('watch', function() {
  gulp.watch('dev/assets/javascripts/**/*.js', ['scripts']);
  gulp.watch('dev/assets/sass/**/*.scss', ['styles']);
  gulp.watch('dev/view/*.jade', ['jade']);
  gulp.watch('*.html', notifyLiveReload);
  gulp.watch('assets/stylesheets/**/*.css', notifyLiveReload);
});

gulp.task('default', ['jade', 'scripts', 'styles', 'express', 'livereload', 'watch'], function() {

});