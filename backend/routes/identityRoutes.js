import express from 'express';
import { registerEmployee, loginEmployee , getCurrentEmployee, getAllEmployees } from '../controller/identityController.js';

const router = express.Router();
import { authenticateUser } from '../middleware/authMiddleware.js';

router.post('/register', registerEmployee);
router.post('/login', loginEmployee);
router.get('/me' , authenticateUser ,  getCurrentEmployee);
router.get('/' , authenticateUser , getAllEmployees);

export default router;