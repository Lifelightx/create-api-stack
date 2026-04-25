import mongoose from "mongoose";
import chalk from "chalk";

//database connection
const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(chalk.cyan(`MongoDB Connected: ${conn.connection.host}`));
    } catch (error: any) {
        console.error(chalk.red.bold(`Error: ${error.message}`));
        process.exit(1);
    }
};

export default connectDB;
