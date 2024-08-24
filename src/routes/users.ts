import { Router } from 'express';
import createUser from '../controllers/users/createUser';
import deleteUser from '../controllers/users/deleteUser';
import getUser from '../controllers/users/getUser';
import getUsers from '../controllers/users/getUsers';
import updateUser from '../controllers/users/updateUser';
import createUserDto from '../dto/createUserDto';
import updateUserDto from '../dto/updateUserDto';
import checkDtoMiddleware from '../middlewares/checkDtoMiddleware';

const router = Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/create', checkDtoMiddleware({ dto: createUserDto }), createUser);

router.put('/update', checkDtoMiddleware({ dto: updateUserDto }), updateUser);

router.delete('/:id', deleteUser);

export default router;
