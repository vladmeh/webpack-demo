require('react');
require('react-dom');
var $ = require('jquery');

var component = require('./component');

document.body.appendChild(component());

$('h1').on('click', function(){
    alert('ok');
});
