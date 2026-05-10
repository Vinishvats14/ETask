import Initiative from '../models/Project.js';

const createInitiative = async (req, res, next) => {
    try {
        const { initiativeTitle, initiativeDescription } = req.body;

        if(!initiativeTitle){
            return res.status(400).json({ message: 'Initiative title is required' });
        }

        const initiative = await Initiative.create({
            initiativeTitle,
            initiativeDescription,
            initiatorId: req.employee.employeeId
        })
        res.status(201).json({
            success: true,
            data: initiative
        })
    }   catch (error) {
        next(error);
    }
}

const getInitiatives = async (req, res, next) => {
    try {
        const initiatives = await Initiative.find().populate('initiatorId', 'fullName emailAddress');
        res.status(200).json({
            success: true,
            count : initiatives.length,
            data: initiatives
        })
    }   catch (error) {
        next(error);
    }
}

const getInitiativeById = async (req, res, next) => {
    try {
        const initiative = await Initiative.findById(req.params.id).populate('initiatorId', 'fullName emailAddress');

        if (!initiative) {
            return res.status(404).json({ message: 'Initiative not found' });      
        }

        res.status(200).json({
            success: true,
            data: initiative
        })
    }   catch (error) {
        next(error);
    }
}


const updateInitiative = async (req, res, next) => {
  try {
    let initiative = await Initiative.findById(req.params.id);

    if (!initiative) {
      res.status(404);
      throw new Error('Initiative not found');
    }
    initiative = await Initiative.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: initiative,
    });
  } catch (error) {
    next(error);
  }
};

const deleteInitiative = async (req, res, next) => {
    try {
        const initiative = await Initiative.findOneAndDelete({ _id: req.params.id, initiatorId: req.employee.employeeId });

        if (!initiative) {
            return res.status(404).json({ message: 'Initiative not found' });              
        }

        res.status(200).json({
            success: true,
            message: 'Initiative deleted successfully'
        })
    }   catch (error) {
        next(error);
    }
}

export { createInitiative, getInitiatives, getInitiativeById, updateInitiative, deleteInitiative };
