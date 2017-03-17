var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    concatCss = require('gulp-concat-css'),
    run = require('gulp-run');

//process is where files that need to be processed go
var src = './process',
    app = './app';


//looks for render.js file in js folder
//pass it through browserify to convert react code to javascript
//include css files
gulp.task('js', function() {
  return gulp.src( src + '/js/render.js' )
    .pipe(browserify({
      transform: 'reactify',
      extensions: 'browserify-css',
      debug: true
    }))
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(gulp.dest(app + '/js')); //semd the result into the app/js folder
});

//just look for changes in html documents to make sure it handles them
gulp.task('html', function() {
  gulp.src( src + '/**/*.html');
});

//looks for files in our /process/css folder and produces a single file in our app/css folder
//we need to incorportate the bootstrap code into app.css
gulp.task('css', function() {
  gulp.src( src + '/css/*.css')
  .pipe(concatCss('app.css'))
  .pipe(gulp.dest(app + '/css'));
});

//move fonts from the bootstrap location to my app folder location
gulp.task('fonts', function() {
    gulp.src('node_modules/bootstrap/dist/fonts/**/*')
    .pipe(gulp.dest(app + '/fonts'));
});

//watch for changes in these folders to execute the commands to update things
gulp.task('watch', ['serve'], function() {
  gulp.watch( src + '/js/**/*', ['js']);
  gulp.watch( src + '/css/**/*.css', ['css']);
  gulp.watch([ app + '/**/*.html'], ['html']);
});

//serve in charge of running our application instead of doing electron .
// main.js  also make sure this is the filename in /app/js and package.json
gulp.task('serve', ['html', 'js', 'css'], function() {
  run('electron app/main.js').exec();
});

gulp.task('default', ['watch', 'fonts', 'serve']);
