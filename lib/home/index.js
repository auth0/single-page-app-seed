/**
 * Module dependencies.
 */

var $ = require('jquery');
var page = require('page');
var html = require('./home.html');
var ripple = require('ripplejs');
var Homepage = ripple(html);

page('/', function(ctx, next) {

  var homepage = new Homepage();
  var section = $('#content');

  section.empty()
  homepage.appendTo(section[0]);
});
