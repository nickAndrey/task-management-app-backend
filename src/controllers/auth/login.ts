import bcrypt from 'bcrypt'; // Assuming bcrypt is used for password hashing
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import db from '../../configs/db.config';

const login = async (req: Request, res: Response) => {
  const { username, password, tokenNoExpired } = req.body;

  const query = 'SELECT * FROM users WHERE email_address = $1';

  try {
    const result = await db.query(query, [username]);

    if (result.rows.length === 0) {
      return res.status(404).send({ data: [], success: false, msg: 'User not found' });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ data: [], success: false, msg: 'Invalid password' });
    }

    const secret = process.env.JWT_SECRET || '';
    const token = jwt.sign(
      { id: user.id, username: user.email_address },
      secret,
      tokenNoExpired
        ? undefined
        : {
            expiresIn: '4h',
          }
    );

    return res.status(200).send({ data: [{ token }], success: true, msg: 'Login successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ data: [], success: false, msg: 'Failed to login' });
  }
};

export default login;
