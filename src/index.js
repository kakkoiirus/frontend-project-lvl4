// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ReactDOM from 'react-dom';

import '../assets/application.scss';

import gon from 'gon';

import Channels from './Channels.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const p = document.createElement('p');
p.classList.add('card-text');
p.textContent = 'It works!';

const container = document.querySelector('#chat');

const props = { channels: gon.channels };

ReactDOM.render(
  Channels(props),
  container,
);

console.log('gon', gon);
