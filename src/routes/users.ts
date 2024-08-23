import { Router } from 'express';
import createUser from '../controllers/users/createUser';
import updateUser from '../controllers/users/updateUser';
import validateUserCreateDto from '../validators/validateUserCreateDto';

const router = Router();

router.post('/create', (req, res) => {
  const error = validateUserCreateDto(req.body);

  if (error) {
    return res.status(400).send({ data: [], success: false, msg: error });
  }

  createUser(req, res);
});

router.put('/update', (req, res) => {
  updateUser(req, res);
});

export default router;
