const { prisma } = require("../../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!login || !password) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }
    const user = await prisma.user.findFirst({
      where: {
        login,
      },
    });
    const isPasswordCorrect = user && await bcrypt.compare(password, user.password);
    const secret = process.env.JWT_SECRET;
    if (user && isPasswordCorrect && secret) {
      const token = jwt.sign({ id: user.id }, secret, { expiresIn: "30d" });
      res.status(200).json({
        id: user.id,
        login: user.login,
        name: user.name,
        role: user.role,
        token: token,
      });
    } else {
      return res.status(400).json({ message: "Incorrect login or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while processing your request" });
  }
};

const register = async (req, res) => {
  try {
    const { login, password, name, role } = req.body;
    if (!login || !password || !name || !role) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }
    const registeredUser = await prisma.user.findFirst({
      where: {
        login,
      },
    });
    if (registeredUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: {
        name,
        login,
        password: hashedPassword,
        role,
      },
    });
    const secret = process.env.JWT_SECRET;
    if (user || secret) {
      res.status(201).json({
        id: user.id,
        login: user.login,
        name,
        role,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
      });
    } else {
      return res.status(400).json({ message: "Failed to create user" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while processing your request" });
  }
};

const current = async (req, res) => {
  try {
    const userId = req.user.id; // Предполагается, что информация о пользователе сохранена в объекте запроса req
    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(currentUser);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching the current user" });
  }
};


module.exports = {
  login,
  register,
  current
};