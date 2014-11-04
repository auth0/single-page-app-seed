/**
 * Module dependencies.
 */

var page = require('page');
var ripple = require('ripplejs');
var html = require('./home.html');
var Homepage = ripple(html);

page('/', function(ctx, next) {
  (new Homepage()).appendTo('#content');
});
