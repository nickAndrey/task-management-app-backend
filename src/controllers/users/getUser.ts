import { Request, Response } from 'express';
import db from '../../configs/db.config';

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const query = 'SELECT * FROM users WHERE id = $1';

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ data: [], success: false, msg: 'Failed to get user' });
    }

    if (!result.rows.length) {
      return res.status(404).send({ data: [], success: false, msg: 'User not found' });
    }

    return res
      .status(200)
      .send({ data: result.rows, success: true, msg: 'User retrieved successfully' });
  });
};

export default getUser;
