import bodyParser from 'body-parser';
import { configDotenv } from 'dotenv';
import express from 'express';
import db from './configs/db.config';
import authMiddleware from './middlewares/authMiddleware';
import authRouter from './routes/auth';
import usersRouter from './routes/users';

configDotenv();

const app = express();
app.use(express.json());
app.use(bodyParser.json());

db.connect();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authMiddleware, usersRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
