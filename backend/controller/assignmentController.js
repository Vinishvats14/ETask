import Assignment from '../models/Task.js';
import Initiative from '../models/Project.js';

export const createAssignment = async (req, res, next) => {
  try {
    const { assignmentTitle, assignmentStatus, assigneeId } = req.body;
    const { initiativeId } = req.params;

    const initiative = await Initiative.findById(initiativeId);
    if (!initiative) {
      res.status(404);
      throw new Error('Initiative not found. Cannot add assignment to a non-existent initiative.');
    }

    const assignment = await Assignment.create({
      assignmentTitle,
      assignmentStatus,
      initiativeId,
      assigneeId
    });

    res.status(201).json({
      success: true,
      data: assignment
    });
  } catch (error) {
    next(error);
  }
};


export const getAssignments = async (req, res, next) => {
  try {
    const { initiativeId } = req.params;
    const query = initiativeId ? { initiativeId } : {};

    const assignments = await Assignment.find(query)
      .populate('assigneeId', 'fullName emailAddress');

    res.status(200).json({
      success: true,
      count: assignments.length,
      data: assignments
    });
  } catch (error) {
    next(error);
  }
};

export const updateAssignment = async (req, res, next) => {
  try {
    let assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      res.status(404);
      throw new Error('Assignment not found');
    }

    if (req.employee.accessLevel !== 'manager') {
       if (assignment.assigneeId.toString() !== req.employee.employeeId.toString()) {
           res.status(403);
           throw new Error('Not authorized to update this assignment');
       }
       req.body = { assignmentStatus: req.body.assignmentStatus };
    }

    assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('assigneeId', 'fullName emailAddress');

    res.status(200).json({
      success: true,
      data: assignment
    });
  } catch (error) {
    next(error);
  }
};


export const deleteAssignment = async (req, res, next) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      res.status(404);
      throw new Error('Assignment not found');
    }

    await assignment.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Assignment deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};