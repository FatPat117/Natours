const form = document.querySelector('.form');

const login = async (email, password) => {
  let response;
  try {
    response = await axios.post('http://127.0.0.1:3000/api/v1/users/login', {
      email,
      password,
    });
  } catch (err) {
    console.log(err.response.data);
  }

  console.log(response);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  login(email, password);
});
