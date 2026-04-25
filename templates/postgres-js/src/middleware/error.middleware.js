export const errorHandler = (err, req, res, next) => {
    console.error(err);

    let error = { ...err };
    error.message = err.message;

    // Sequelize unique constraint error
    if (err.name === "SequelizeUniqueConstraintError") {
        const message = err.errors.map(e => e.message).join(", ");
        error = { message, statusCode: 400 };
    }

    // Sequelize validation error
    if (err.name === "SequelizeValidationError") {
        const message = err.errors.map(e => e.message).join(", ");
        error = { message, statusCode: 400 };
    }

    const statusCode = error.statusCode || 500;
    const message = error.message || "Server Error";

    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
};
