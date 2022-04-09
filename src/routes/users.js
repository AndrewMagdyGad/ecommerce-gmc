const express = require("express");
const Joi = require("joi");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

// GET Register view
router.get("/register", (req, res) => {
    res.render("register");
});

// GET Login view
router.get("/login", (req, res) => {
    res.render("login");
});

// POST new user
router.post("/", async (req, res) => {
    const body = req.body;
    console.log("body" + body);

    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string()
            .length(10)
            .pattern(/^[0-9]+$/)
            .required(),
        password: Joi.string().required().min(5),
    });

    const { error } = schema.validate(body);

    if (error) {
        res.status(400).send(error);
        // res.render("register", { error });
    } else {
        const newUser = new User({
            name: body.name,
            email: body.email,
            phoneNumber: body.phoneNumber,
            password: body.password,
        });

        bcrypt.hash(
            newUser.password + process.env.PEPPER,
            +process.env.SALT_ROUNDS || "",
            async (err, hash) => {
                newUser.password = hash;
                await newUser.save();
                res.status(200).send(newUser);
                // res.redirect("/products");
            }
        );
    }
});

router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/products",
        failureRedirect: "/users/login",
    })(req, res, next);
});

router.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/products");
});

module.exports = router;
