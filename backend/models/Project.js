import mongoose from "mongoose";

const initiativeSchema = new mongoose.Schema({
    initiativeTitle: {
        type: String,
        required: true
    },
    initiativeDescription: {
        type: String,
        required: true
    },
    initiatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    }
}, {
    timestamps: true
} );

const Initiative = mongoose.model("Initiative", initiativeSchema);

export default Initiative; 


