import { Router } from 'express';
import createUser from '../controllers/users/createUser';
import validateUserCreateDto from '../validators/validateUserCreateDto';

const router = Router();

router.post('/create', (req, res) => {
  const error = validateUserCreateDto(req.body);

  if (error) {
    return res.status(400).send({ data: [], success: false, msg: error });
  }

  createUser(req, res);
});

export default router;
