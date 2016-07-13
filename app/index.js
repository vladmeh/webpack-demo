require('./main.css');
require('react');
var $ = require('jquery');

var component = require('./component');

document.body.appendChild(component());

$('h1').on('click', function(){
    alert('ok');
});