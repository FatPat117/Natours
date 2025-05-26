const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // config .env
// console.log(process.env)

const mongoose = require('mongoose');
const app = require('./app');

process.on('unhandledRejection', (err) => {
  // console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting down...');
  // server.close(() => process.exit(1));
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  // console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  // server.close(() => process.exit(1));
  process.exit(1);
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('DB connection successful');
  });

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log('App is running on port 3000');
});
