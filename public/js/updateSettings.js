import axios from 'axios';
export const updateData = async (name, email) => {
  try {
    const res = await axios.patch(
      'http://127.0.0.1:3000/api/v1/users/updateMe',
      {
        name,
        email,
      },
      {
        Headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (res.data.status === 'Success') {
      showAlert('success', 'Data Updated Successfully');
      window.setTimeout(() => {
        location.assign('/me');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
