const express = require("express");
const cors = require("cors");
const passport = require("passport");

// Required Routes
const userRoutes = require("./apis/users/users.routes");

// Database Connection
const connectDB = require("./db/database");

// Required Middlewares
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

// Required Passport
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const app = express();
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(errorHandler);

// Passport
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// Routes
app.use("/api", userRoutes);

const PORT = 8000;
app.listen(PORT, () => console.log(`Application running on localhost:${PORT}`));
