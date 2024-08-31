const queries = {
  createUsersTable: `
    CREATE TABLE IF NOT EXISTS users(
      id UUID PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email_address VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      phone_number VARCHAR(20),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,

  createChatsTable: `
    CREATE TABLE IF NOT EXISTS chats(
      id UUID PRIMARY KEY,
      is_group_chat BOOLEAN DEFAULT FALSE,
      name VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,

  createUserChatsTable: `
    CREATE TABLE IF NOT EXISTS user_chats(
      user_id UUID,
      chat_id UUID,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (chat_id) REFERENCES chats(id)
    )
  `,

  createMessagesTable: `
    CREATE TABLE IF NOT EXISTS messages(
      id UUID PRIMARY KEY,
      user_id UUID,
      chat_id UUID,
      content VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (chat_id) REFERENCES chats(id)
    )
  `,
};

export default queries;
