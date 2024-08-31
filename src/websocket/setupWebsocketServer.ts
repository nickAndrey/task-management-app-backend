import { configDotenv } from 'dotenv';
import http from 'http';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { WebSocketServer } from 'ws';
import db from '../configs/db.config';

configDotenv();

const checkForExistingChat = async (userIdA: string, userIdB: string) => {
  const query = `
    SELECT chat_id 
    FROM user_chats 
    WHERE user_id = $1 
    AND chat_id IN (
      SELECT chat_id 
      FROM user_chats 
      WHERE user_id = $2
    )
  `;

  const result = await db.query(query, [userIdA, userIdB]);

  if (result.rows.length > 0) {
    return result.rows[0].chat_id;
  } else {
    return null;
  }
};

const handleIncomingMessage = async (userIdA: string, userIdB: string, messageContent: string) => {
  // Check if a chat exists
  let chatId = await checkForExistingChat(userIdA, userIdB);

  if (!chatId) {
    // If no chat exists, create a new chat
    chatId = uuidv4();
    await db.query(`INSERT INTO chats (id) VALUES ($1)`, [chatId]);

    // Link both users to this new chat
    await db.query(`INSERT INTO user_chats (user_id, chat_id) VALUES ($1, $2), ($3, $2)`, [
      userIdA,
      chatId,
      userIdB,
    ]);
  }

  // Save the message to the messages table
  await db.query(`INSERT INTO messages (id, user_id, chat_id, content) VALUES ($1, $2, $3, $4)`, [
    uuidv4(),
    userIdA,
    chatId,
    messageContent,
  ]);

  return chatId;
};

type Args = {
  server: http.Server;
};

const setupWebsocketServer = ({ server }: Args) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (stream, req) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return wss.close();
    }

    const token = authorization.split('Bearer ').join('');
    const secret = process.env.JWT_SECRET || '';

    jwt.verify(token, secret, (err) => {
      if (err) {
        return wss.close();
      }
    });

    stream.on('error', (err) => {
      console.error('An error occurred in ws:', err);
    });

    stream.on('message', (data) => {
      const { sender_id, recipient_id, message } = JSON.parse(data.toString()) as unknown as {
        sender_id: string;
        recipient_id: string;
        message: string;
      };

      handleIncomingMessage(sender_id, recipient_id, message);
    });

    stream.send('test');
  });
};

export default setupWebsocketServer;
