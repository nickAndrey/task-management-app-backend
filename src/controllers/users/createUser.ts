import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../../configs/db.config';
import User from '../../models/User';

const createUser = (req: Request, res: Response) => {
  const { first_name, last_name, email_address, password, phone_number } = req.body;

  const newUser: User = {
    id: uuidv4(),
    first_name,
    last_name,
    email_address,
    password: bcrypt.hashSync(password, 10),
    phone_number,
    created_at: new Date().toISOString(),
    updated_at: null,
  };

  const query = `
      INSERT INTO users (id, first_name, last_name, email_address, password, phone_number, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

  const values = [
    newUser.id,
    newUser.first_name,
    newUser.last_name,
    newUser.email_address,
    newUser.password,
    newUser.phone_number,
    newUser.created_at,
    newUser.updated_at,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      const { code } = err as unknown as { code: string };

      if (code === '23505') {
        return res
          .status(400)
          .send({ data: [], success: false, msg: 'Email address already exists' });
      }

      return res.status(500).send({ data: [], success: false, msg: 'Failed to create user' });
    }

    return res
      .status(201)
      .send({ data: result.rows, success: true, msg: 'User created successfully' });
  });
};

export default createUser;
