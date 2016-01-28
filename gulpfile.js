/**
 * Gulpfile
 */
var gulp = require('gulp');
var debug = require('gulp-debug');
var gpg = require('./index.js');

gulp.task('default', function () {
  return gulp.src('test/**')
    .pipe(gulp.dest('dist'))
    .pipe(gpg())
    .pipe(debug())
    .pipe(gulp.dest('dist'))
});
