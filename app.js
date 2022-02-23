const express = require("express");
const cors = require("cors");

const path = require("path");

// Required Routes
const userRoutes = require("./apis/users/users.routes");
const tripRoutes = require("./apis/trips/trips.routes");
const profileRoutes = require("./apis/profiles/profiles.routes");

// Database Connection
const connectDB = require("./db/database");

// Required Middlewares
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const passport = require("passport");

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
app.use("/api/trips", tripRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

const PORT = 8000;
app.listen(PORT, () => console.log(`Application running on localhost:${PORT}`));
