const fs = require('fs');
const express = require('express');

const app = express();

const PORT = 3000;

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello World', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.status(200).json({ message: 'Hello World', app: 'Natours' });
// });
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.listen(PORT, () => {
  console.log('App is running on port 3000');
});
