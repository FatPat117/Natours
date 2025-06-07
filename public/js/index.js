import '@babel/polyfill';
import { displayMap } from './leaflet.js';
import { login } from './login.js';

// DOM ELEMENT
const map = document.getElementById('map');
const form = document.querySelector('.form');

// VALUES

// DELEGATION
if (map) {
  const locations = JSON.parse(map.dataset.locations);
  displayMap(locations);
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    login(email, password);
  });
}
