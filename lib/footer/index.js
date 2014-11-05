/**
 * Module dependencies.
 */

var ripple = require('ripplejs');
var html = require('./footer.html');
var Footer = ripple(html);

/**
 * Initialize and render
 */

var footer = new Footer();
footer.appendTo('footer');
