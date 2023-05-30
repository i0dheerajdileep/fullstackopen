const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require('./controllers/login')
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
require('express-async-errors')


mongoose
  .connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info("Connected to mongodb")
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger)
app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
app.use(middleware.tokenExtractor);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);


module.exports = app