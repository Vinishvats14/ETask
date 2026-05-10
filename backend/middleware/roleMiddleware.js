

const checkPermissions = (...accessLevels) => {
    return (req, res , next) => {
        if(!req.employee || !accessLevels.includes(req.employee.accessLevel)){
            return res.status(403).json({
                success: false,
                message: 'Permission denied. Insufficient access rights.'
             });
    }
    next();
};
};

export default checkPermissions;
