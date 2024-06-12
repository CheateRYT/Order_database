const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require('cors')
require("dotenv").config();

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // Разрешить доступ только с этого домена
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use("/api/user", require("./routes/users"));
app.use("/api/orders", require("./routes/orders"));
module.exports = app;
