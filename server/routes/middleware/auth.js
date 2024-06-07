
const { prisma } = require("../../prisma/prisma-client");
const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.id,
      },
    });
    if (!user) {
      throw new Error("Пользователь не найден");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ message: "Не авторизован" });
  }
};

module.exports = {
  auth,
};
