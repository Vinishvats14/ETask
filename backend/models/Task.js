import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    assignmentTitle: {
           type: String,
           required: true,
       },
       assignmentStatus: {
           type: String,
           enum: ['Not Started', 'In Progress', 'Completed'],
           default: 'Not Started'
       },
       initiativeId: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Initiative",
           required: true
       },
       assigneeId: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Employee",
           required: true
       }
   }, {
       timestamps: true
   });

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;