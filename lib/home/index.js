/**
 * Module dependencies.
 */

var page = require('page');
var ripple = require('ripplejs');
var html = require('./home.html');
var jquery = require('jquery');
var Homepage = ripple(html);

page('/', function(ctx, next) {
  var homepage = new Homepage;
  var section = jquery('#content');

  section.empty()
  homepage.appendTo(section[0]);
});
