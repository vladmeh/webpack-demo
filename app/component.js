module.exports = function () {
  var element = document.createElement('h1');

  element.id = 'head';
  element.className = 'pure-button';
  element.classList.add('pure-button-primary');
  //element.classList.add('pure-button-active');
  element.innerHTML = 'Hello worlds !!!';

  return element;
};
