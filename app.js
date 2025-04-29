const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json()); // Use middleware

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

app.post('/api/v1/tours', (req, res) => {
  //   console.log(req.body);
  const data = req.body;
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...data };
  //   console.log(newTour);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    'utf-8',
    (err) => {
      res.status(201).json({ status: 'success', data: { tour: newTour } });
    }
  );
});

app.listen(PORT, () => {
  console.log('App is running on port 3000');
});
