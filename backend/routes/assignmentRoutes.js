import express from 'express';

const router = express.Router( { mergeParams: true } );
import { getAssignments, createAssignment, updateAssignment, deleteAssignment } from '../controller/assignmentController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
import checkPermissions from '../middleware/roleMiddleware.js';


router.post('/' , authenticateUser , checkPermissions('manager') , createAssignment);
router.get('/' , authenticateUser , getAssignments);

router.put('/:id' , authenticateUser , updateAssignment);

router.delete('/:id' , authenticateUser , checkPermissions('manager') , deleteAssignment);

export default router;
