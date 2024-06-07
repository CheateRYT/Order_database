const { prisma } = require("../../prisma/prisma-client");

const executorCheck = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user || user.role !== "executor") {
            return res.status(403).json({ message: "User is not authorized as an executor" });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "An error occurred during authentication" });
    }
};

module.exports = {
    executorCheck,
};