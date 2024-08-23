import { Router } from 'express';
import createUser from '../controllers/users/createUser';
import deleteUser from '../controllers/users/deleteUser';
import getUser from '../controllers/users/getUser';
import getUsers from '../controllers/users/getUsers';
import updateUser from '../controllers/users/updateUser';
import validateUserCreateDto from '../validators/validateUserCreateDto';
import validateUserUpdateDto from '../validators/validateUserUpdateDto';

const router = Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/create', (req, res) => {
  const error = validateUserCreateDto(req.body);

  if (error) {
    return res.status(400).send({ data: [], success: false, msg: error });
  }

  createUser(req, res);
});

router.put('/update', (req, res) => {
  const error = validateUserUpdateDto(req.body);

  if (error) {
    return res.status(400).send({ data: [], success: false, msg: error });
  }

  updateUser(req, res);
});

router.delete('/:id', deleteUser);

export default router;
