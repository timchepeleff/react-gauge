var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', function() {
  return gulp.src('src/react-gauge.js')
    .pipe(babel()) // see .babelrc
    .pipe(gulp.dest('dist'));
});
