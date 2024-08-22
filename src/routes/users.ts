import { Router } from 'express';
import createUser from '../controllers/users/createUser';
import userReqValidator from '../validators/userReqValidator';

const router = Router();

router.use((req, res, next) => {
  const body: unknown = req.body;
  const error = userReqValidator(body as Record<string, unknown>);

  if (error) {
    res.status(400).send({ data: [], success: false, msg: error });
    return;
  }
  next();
});

router.post('/create', createUser);

export default router;
