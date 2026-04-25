import { Sequelize } from "sequelize";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.POSTGRES_URI as string, {
    dialect: "postgres",
    logging: false,
});

const connectDB = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log(chalk.cyan("PostgreSQL Connected..."));

        // Sync models
        await sequelize.sync({ alter: true });
        console.log(chalk.cyan("Models synced successfully."));
    } catch (error: any) {
        console.error(chalk.red.bold(`Error: ${error.message}`));
        process.exit(1);
    }
};

export { sequelize };
export default connectDB;
