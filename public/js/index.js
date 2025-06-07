import '@babel/polyfill';
import { displayMap } from './leaflet.js';
import { login, logout } from './login.js';
import { updateSettings } from './updateSettings.js';
// DOM ELEMENT
const map = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
// VALUES

// DELEGATION
if (map) {
  const locations = JSON.parse(map.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    login(email, password);
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', () => {
    logout();
  });
}

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const name = document.querySelector('#name').value;

    updateSettings({ name, email }, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const passwordCurrent = document.querySelector('#password-current').value;
    const password = document.querySelector('#password').value;
    const passwordConfirm = document.querySelector('#password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password',
    );

    document.querySelector('#password-current').value = '';
    document.querySelector('#password').value = '';
    document.querySelector('#password-confirm').value = '';
  });
}
