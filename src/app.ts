import { configDotenv } from 'dotenv';
import express from 'express';
import db from './configs/db.config';
import users from './routes/users';

configDotenv();

const app = express();
app.use(express.json());

db.connect();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/v1/users', users);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
