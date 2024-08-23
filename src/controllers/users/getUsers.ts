import { Request, Response } from 'express';
import db from '../../configs/db.config';

const getUsers = async (req: Request, res: Response) => {
  const query = 'SELECT * FROM users';

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send({ data: [], success: false, msg: 'Failed to get users' });
    }

    return res
      .status(200)
      .send({ data: result.rows, success: true, msg: 'User retrieved successfully' });
  });
};

export default getUsers;
