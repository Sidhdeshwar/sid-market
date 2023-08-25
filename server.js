// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const colors = require('console-log-colors');

const app = require('./main');

console.log(process.env.PORT);
console.log(colors.bgBlue(process.env.NODE_ENV));
const port = process.env.PORT;
const DB = process.env.DATABASE_URL.replace('<password>', process.env.PASSWORD);
console.log(DB);

mongoose.connect(DB).then(() => {
  console.log(colors.bgGreen('Connected with DB'));
});

const server = app.listen(port, () => {
  console.log(colors.green('Server listning on port : '), port);
});

process.on('unhandledRejection', (err) => {
  console.log('Shouting Doun == due to NOT Connected With MongoDB', err);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log(
    colors.bgRed('Any Error Handdled Here : '),
    err.name,
    ':=>',
    err.message,
  );
});

// console.log(x);
