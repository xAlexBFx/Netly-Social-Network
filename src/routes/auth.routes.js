import { Router } from 'express';
import { register, login, logout, verifyAccessToken, deleteAuth } from '../controllers/auth.controller.js';
import { validateSchema } from '../middlewares/validate.schema.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';
import { authRequired } from '../middlewares/validate.token.js';

const router = Router();

router.post('/register',validateSchema(registerSchema), register);
router.post('/login',validateSchema(loginSchema), login);
router.post('/logout', logout);
router.delete('/delete-auth',authRequired, deleteAuth);
router.get('/verify', verifyAccessToken);

export default router;