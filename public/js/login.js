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
        location.assign('/'), 1000;
      });
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }

  console.log(response);
};

export const logout = async () => {
  try {
    const res = await axios.get('http://127.0.0.1:3000/api/v1/users/logout');
    if (res.data.status === 'success') location.reload(true);
  } catch (err) {
    showAlert('error', 'Error Logging out! Try agian.');
  }
};
