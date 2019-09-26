import 'normalize.css';
import './main.css';

import $ from 'jquery';
import app from './app';

function main() {
  app.bindEventListeners();
  app.render();
}

$(main);

