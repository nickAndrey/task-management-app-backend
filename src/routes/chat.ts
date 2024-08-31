import { Router } from 'express';
import chatCreateDto from '../dto/chatCreateDto';
import authMiddleware from '../middlewares/authMiddleware';
import checkDtoMiddleware from '../middlewares/checkDtoMiddleware';

const router = Router();

router.post('/create', authMiddleware, checkDtoMiddleware({ dto: chatCreateDto }));

export default router;
