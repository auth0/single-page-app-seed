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
var CleanCSS = require('clean-css');
var npmcss = require('npm-css');

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
    .transform({'global': true}, 'uglifyify')
    .bundle({
      'debug': false
    })
    .pipe(source('build.js'))
    .pipe(gulp.dest('./build/'));
});

/**
 * npmcss task
 */

gulp.task('npmcss', function() {
  var file = path.resolve('index.css');
  var linked = npmcss(file);
  var minified = new CleanCSS().minify(linked);
  var output = fs.createWriteStream('build/build.css');
  output.write(minified);
  output.end();
});

/**
 * Build task
 */
gulp.task('build', ['browserify', 'npmcss']);
