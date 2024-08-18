import { configDotenv } from 'dotenv';
import express from 'express';

configDotenv();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
