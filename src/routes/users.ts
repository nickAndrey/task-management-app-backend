import { Router } from 'express';
import createUser from '../controllers/users/createUser';
import deleteUser from '../controllers/users/deleteUser';
import getUser from '../controllers/users/getUser';
import getUsers from '../controllers/users/getUsers';
import updateUser from '../controllers/users/updateUser';
import createUserDto from '../dto/createUserDto';
import updateUserDto from '../dto/updateUserDto';
import authMiddleware from '../middlewares/authMiddleware';
import checkDtoMiddleware from '../middlewares/checkDtoMiddleware';

const router = Router();

router.post('/create', checkDtoMiddleware({ dto: createUserDto }), createUser);
router.get('/:id', authMiddleware, getUser);
router.get('/', authMiddleware, getUsers);
router.put('/update', authMiddleware, checkDtoMiddleware({ dto: updateUserDto }), updateUser);
router.delete('/:id', authMiddleware, deleteUser);

export default router;
