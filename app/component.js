module.exports = function () {
  var element = document.createElement('h1');
  var styles = require('./main.css');

  element.innerHTML = 'Hello All Worlds !!!';
  element.className = styles.redButton;

  return element;
};