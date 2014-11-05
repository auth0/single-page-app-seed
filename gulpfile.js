/**
 * Module dependencies.
 */

var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var mkdirp = require('mkdirp');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var stringify = require('stringify');
var rework = require('rework');
var npmRework = require('rework-npm');
var serve = require('gulp-serve');

/**
 * Create build directory
 */

mkdirp('./build');

function bundle(browserified, env) {
  browserified
    .bundle()
    .pipe(source('build.js'))
    .pipe(gulp.dest('./build/'));
}


function browserifyTask(env) {
  return function() {
    var file = path.resolve('index.js');
    var browserified = browserify(watchify.args);

    if (env === 'prod') {
      browserified.transform({global: true}, 'uglifyify');
    }
    if (env === 'dev') {
       browserified = watchify(browserified);
       browserified.on('update', function(){
        bundle(browserified, env);
      });
    }

    browserified.transform(stringify(['.html']));
    bundle(browserified.add(file), env);
  }
}
/**
 * Browserify task
 */

gulp.task('browserify-dev', browserifyTask('dev'));

gulp.task('serve', serve(__dirname));

/**
 * rework-css task
 */

gulp.task('reworkcss', function() {
  var file = path.resolve('index.css');
  var source = path.relative(__dirname, file);
  var output = fs.createWriteStream('build/build.css');
  var contents = fs.readFileSync(file, {encoding: 'utf8'});

  // Initialize and pluginize `rework`
  var css = rework(contents);
  css.use(npmRework());

  // write result
  output.write(css.toString())
  output.end();
});

/**
 * Build task
 */

gulp.task('default', ['watch']);
gulp.task('watch', ['browserify-dev', 'reworkcss', 'serve']);
