var fs = require('fs');
var pkg = JSON.parse(fs.readFileSync('./package.json'));
var gulp = require('gulp');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var wpPot = require('gulp-wp-pot');
var merge = require('merge-stream');
var help = require('gulp-help')(gulp, {
  description: 'Show this help message.'
});

gulp.task('uglify', 'Concat and uglify all the javascript files into one file.', function () {
  var userScript = gulp.src('./assets/src/js/user/**/*.js')
    .pipe(concat('user.js'))
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('./assets/dist/js/user'))
    .pipe(uglify())
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./assets/dist/js/user'));

  var adminScript = gulp.src('./assets/src/js/admin/**/*.js')
    .pipe(concat('admin.js'))
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('./assets/dist/js/admin'))
    .pipe(uglify())
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./assets/dist/js/admin'));

  return merge(userScript, adminScript);
});

gulp.task('sass', 'Compile and minify all the sass files into one file.', function () {
  var options = {outputStyle: 'compressed'};

  var mainStyle = gulp.src('./assets/src/scss/user.scss')
    .pipe(sass(options))
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(gulp.dest('./assets/dist/css'));

  var editorStyle = gulp.src('./assets/src/scss/editor-style.scss')
    .pipe(sass(options))
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(gulp.dest('./assets/dist/css'));

  var adminStyle = gulp.src('./assets/src/scss/admin.scss')
    .pipe(sass(options))
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(gulp.dest('./assets/dist/css'));

  return merge(mainStyle, editorStyle, adminStyle);
});

gulp.task('makepot', 'Generates pot files for your WordPress project.', function () {
  gulp.src('src/**/*.php')
    .pipe(wpPot({
      domain: pkg.name,
      package: pkg.description
    }))
    .pipe(gulp.dest('./languages/' + pkg.name + '.pot'));
});

gulp.task('watch', 'Watch for file changes and execute various tasks.', function () {
  watch('./assets/src/js/**/*.js', function () {
    gulp.start('uglify');
  });

  watch('./assets/src/scss/**/*.scss', function () {
    gulp.start('sass');
  });
});

gulp.task('build', 'Build all the project for the distribution.', ['uglify', 'sass', 'makepot']);

gulp.task('default', ['watch']);
