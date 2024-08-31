import { Router } from 'express';
import login from '../controllers/login';
import loginDto from '../dto/loginDto';
import checkDtoMiddleware from '../middlewares/checkDtoMiddleware';

const router = Router();

router.post('/login', checkDtoMiddleware({ dto: loginDto }), login);

export default router;
