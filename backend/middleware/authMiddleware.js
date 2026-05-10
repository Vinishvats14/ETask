import jwt from 'jsonwebtoken';
import Employee from '../models/User.js';

export const authenticateUser = async (req, res, next) => {
    let authToken;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            authToken = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(authToken, process.env.TOKEN_KEY);
            if(decodedToken){
                const employee = await Employee.findById(decodedToken.employeeId);
                if(employee){
                    req.employee = {
                        employeeId: employee._id,
                        fullName: employee.fullName,
                        emailAddress: employee.emailAddress,
                        accessLevel: employee.accessLevel
                    };
                    next();
                } else {
                    res.status(401).json({message: 'Unauthorized access, employee not found'});
                }
            }else{
                res.status(401).json({message: 'Unauthorized access, token invalid'});
            }
        } catch (error) {
            res.status(401).json({message: 'Unauthorized access, token invalid'});        

        }   
    } else {
        res.status(401).json({message: 'Unauthorized access, no token provided'});
    }
}

export default authenticateUser;