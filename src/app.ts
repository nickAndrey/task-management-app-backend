import bodyParser from 'body-parser';
import { configDotenv } from 'dotenv';
import express from 'express';
import http from 'http';
import db from './configs/db.config';
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import setupWebsocketServer from './websocket/setupWebsocketServer';

configDotenv();

const app = express();
app.use(express.json());
app.use(bodyParser.json());

db.connect();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);

const port = process.env.PORT || 3000;
const server = http.createServer(app);

setupWebsocketServer({ server });

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
