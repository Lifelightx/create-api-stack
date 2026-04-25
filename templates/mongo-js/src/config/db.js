import mongoose from "mongoose";
import chalk from "chalk";

//database connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(chalk.cyan(`MongoDB Connected: ${conn.connection.host}`));
    } catch (error) {
        console.error(chalk.red.bold(`Error: ${error.message}`));
        process.exit(1);
    }
};

export default connectDB;
