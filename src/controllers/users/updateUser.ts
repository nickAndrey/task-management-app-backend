import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import db from '../../configs/db.config';
import User from '../../models/User';

const updateUser = async (req: Request, res: Response) => {
  const { id, first_name, last_name, phone_number, email_address, password } =
    req.body as Partial<User>;

  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

  const newUser: Partial<User> = {
    first_name: first_name || undefined,
    last_name: last_name || undefined,
    phone_number: phone_number || undefined,
    email_address: email_address ? email_address.toLowerCase() : undefined,
    password: hashedPassword,
    updated_at: new Date().toISOString(),
  };

  const query = `
    UPDATE users
    SET first_name = COALESCE($1, first_name), 
        last_name = COALESCE($2, last_name), 
        phone_number = COALESCE($3, phone_number), 
        email_address = COALESCE($4, email_address), 
        password = COALESCE($5, password), 
        updated_at = $6
    WHERE id = $7
    RETURNING *
  `;

  const values = [
    newUser.first_name,
    newUser.last_name,
    newUser.phone_number,
    newUser.email_address,
    newUser.password,
    newUser.updated_at,
    id,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).send({ data: [], success: false, msg: 'Failed to update user' });
    }

    if (!result.rows.length) {
      return res.status(404).send({ data: [], success: false, msg: 'User not found' });
    }

    return res
      .status(200)
      .send({ data: result.rows, success: true, msg: 'User updated successfully' });
  });
};

export default updateUser;
