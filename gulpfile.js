/**
 * Module dependencies.
 */

var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var mkdirp = require('mkdirp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var stringify = require('stringify');
var rework = require('rework');
var npmRework = require('rework-npm');

/**
 * Create build directory
 */

mkdirp('./build');

/**
 * Browserify task
 */

gulp.task('browserify', function() {
  var file = path.resolve('index.js');
  browserify(file)
    .require(file, {'expose': 'modal'})
    .transform(stringify(['.html']))
    // .transform({'global': true}, 'uglifyify')
    .bundle({
      'debug': false
    })
    .pipe(source('build.js'))
    .pipe(gulp.dest('./build/'));
});

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

gulp.task('build', ['browserify', 'reworkcss']);
