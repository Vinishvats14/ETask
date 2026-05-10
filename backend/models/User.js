import mongoose from "mongoose";    

const employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    accessLevel: {
        type: String,
        enum: ['standard', 'manager'],
        default: 'standard'
    }
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;    