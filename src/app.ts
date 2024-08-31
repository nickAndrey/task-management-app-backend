import bodyParser from 'body-parser';
import { configDotenv } from 'dotenv';
import express from 'express';
import http from 'http';
import setupDatabase from './configs/setupDatabase';
import errorHandler from './middlewares/errorHandler';
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import setupWebsocketServer from './websocket/setupWebsocketServer';

configDotenv();

const app = express();
app.use(express.json());
app.use(bodyParser.json());

setupDatabase();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);

const port = process.env.PORT || 3000;
const server = http.createServer(app);

setupWebsocketServer({ server });

app.use(errorHandler);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
