import axios from 'axios';
import { showAlert } from './alerts';
export const login = async (email, password) => {
  let response;
  try {
    response = await axios.post('http://127.0.0.1:3000/api/v1/users/login', {
      email,
      password,
    });

    if (response.data.status === 'success') {
      showAlert('success', 'Logged in successfully');

      window.setTimeout(() => {
        location.assign('/');
      });
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }

  console.log(response);
};
