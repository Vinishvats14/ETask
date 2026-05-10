import mongoose from "mongoose";

const establishDatabaseConnection = async () => {
    try {
        const databaseUri = process.env.DB_CONNECTION;
        if (!databaseUri) {
            throw new Error('DB_CONNECTION is not defined in environment variables');
        }

        const connection = await mongoose.connect(databaseUri);
        console.log(`Database Connected: ${connection.connection.host}`);
    } catch (error) {
        console.error(`Connection Error: ${error.message}`);
        process.exit(1);
    }
};

export default establishDatabaseConnection;