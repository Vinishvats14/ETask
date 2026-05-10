import Employee from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const registerEmployee = async (req, res) => {
    try {
        const { fullName, emailAddress, password, passwordHash, accessLevel = 'standard' } = req.body;
        const plainPassword = password || passwordHash;

        const existingEmployee = await Employee.findOne({ emailAddress });
        if (existingEmployee) {
            return res.status(400).json({ success: false, message: 'Employee already exists' });
        }

        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        const employee = new Employee({
            fullName,
            emailAddress,
            passwordHash: hashedPassword,
            accessLevel,
        });

        await employee.save();

        const authToken = jwt.sign({ employeeId: employee._id }, process.env.TOKEN_KEY, { expiresIn: '1h' });

        res.status(201).json({
            success: true,
            token: authToken,
            employee: {
                _id: employee._id,
                fullName: employee.fullName,
                emailAddress: employee.emailAddress,
                accessLevel: employee.accessLevel,
            },
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const loginEmployee = async (req, res) => {
    try {
        const { emailAddress, password, passwordHash } = req.body;
        const plainPassword = password || passwordHash;

        const employee = await Employee.findOne({ emailAddress });
        if (!employee) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(plainPassword, employee.passwordHash);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const authToken = jwt.sign({ employeeId: employee._id }, process.env.TOKEN_KEY, { expiresIn: '1h' });

        res.json({
            success: true,
            token: authToken,
            employee: {
                _id: employee._id,
                fullName: employee.fullName,
                emailAddress: employee.emailAddress,
                accessLevel: employee.accessLevel,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const getCurrentEmployee = async (req, res, next) => {
    try {
        const employee = await Employee
            .findById(req.employee.employeeId)
            .select("-passwordHash");

        if (!employee) {
            const error = new Error("Employee not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            success: true,
            employee,
        });

    } catch (error) {
        next(error);
    }
};

export const getAllEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find().select("-passwordHash");
        res.status(200).json({
            success: true,
            data: employees,
        });
    } catch (error) {
        next(error);
    }
};