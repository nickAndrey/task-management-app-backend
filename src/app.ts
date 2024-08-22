import { configDotenv } from 'dotenv';
import express from 'express';
import db from './configs/db.config';

configDotenv();

const app = express();
app.use(express.json());

db.connect();

db.query('SELECT * FROM users', (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
  } else {
    console.log(res.rows);
  }
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
