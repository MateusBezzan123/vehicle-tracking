import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authenticateToken } from '../middlewares/authenticateToken';
import { registerValidation, loginValidation, updateUserValidation } from '../validators/userValidators';

const router = Router();

router.post('/register', registerValidation, userController.register);
router.post('/login', loginValidation, userController.login);
router.get('/me', authenticateToken, userController.getMe);
router.get('/', authenticateToken, userController.listUsers);
router.get('/:id', authenticateToken, userController.getUser);
router.put('/:id', authenticateToken, updateUserValidation, userController.updateUser);
router.delete('/:id', authenticateToken, userController.deleteUser);


export default router;
