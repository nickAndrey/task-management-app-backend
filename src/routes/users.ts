import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/users';
import createUserDto from '../dto/createUserDto';
import updateUserDto from '../dto/updateUserDto';
import authMiddleware from '../middlewares/authMiddleware';
import checkDtoMiddleware from '../middlewares/checkDtoMiddleware';

const router = Router();

router.post('/create', checkDtoMiddleware({ dto: createUserDto }), createUser);
router.get('/:id', authMiddleware, getUserById);
router.get('/', authMiddleware, getAllUsers);
router.put('/update/:id', authMiddleware, checkDtoMiddleware({ dto: updateUserDto }), updateUser);
router.delete('/:id', authMiddleware, deleteUser);

export default router;
