import db from './db.config';
import queries from './queries';

const setupDatabase = async () => {
  try {
    await db.connect();

    await db.query(queries.createUsersTable);
    await db.query(queries.createChatsTable);
    await db.query(queries.createUserChatsTable);
    await db.query(queries.createMessagesTable);
  } catch (err) {
    console.error('Error creating tables:', err);
  }
};

export default setupDatabase;
