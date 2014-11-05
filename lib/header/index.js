/**
 * Module dependencies.
 */

var ripple = require('ripplejs');
var html = require('./header.html');
var Header = ripple(html);

/**
 * Initialize and render
 */

var header = new Header();
header.appendTo('header');
