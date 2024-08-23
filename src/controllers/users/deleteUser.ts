import { Request, Response } from 'express';
import db from '../../configs/db.config';

const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;

  const query = 'DELETE FROM users WHERE id = $1';

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ data: [], success: false, msg: 'Failed to delete user' });
    }

    if (!result.rows.length) {
      return res.status(404).send({ data: [], success: false, msg: 'User not found' });
    }

    return res
      .status(200)
      .send({ data: result.rows, success: true, msg: 'User deleted successfully' });
  });
};

export default deleteUser;
