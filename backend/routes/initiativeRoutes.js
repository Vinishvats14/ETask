import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware.js';
import { createInitiative , getInitiatives , getInitiativeById, updateInitiative , deleteInitiative } from '../controller/initiativeController.js';
import checkPermissions from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', authenticateUser, checkPermissions('manager'), createInitiative);

router.get('/', authenticateUser, getInitiatives);

router.get('/:id', authenticateUser, getInitiativeById);
router.put('/:id', authenticateUser, checkPermissions('manager'), updateInitiative);

router.delete('/:id', authenticateUser, checkPermissions('manager'), deleteInitiative);

export default router; 
