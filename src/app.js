require("dotenv").config();
const express = require("express");
const productRouters = require("./routes/products");
const userRouters = require("./routes/users");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

require("./config/passport")(passport);

mongoose.connect(process.env.CONNECTION_STRING, {}, () =>
    console.log("Connected to DB")
);

const app = express();

// View Engine
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

// 1. Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Middleware
app.use(session({ secret: "secret" }));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/products", productRouters);
app.use("/users", userRouters);

app.listen(process.env.PORT, () =>
    console.log(`Server is up and running on ${process.env.PORT}`)
);

module.exports = app;
