const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
    const products = await Product.find();
    res.render("home.pug", { products, user: req.user });
});

router.get("/add", (req, res) => res.render("add-product.pug"));

router.post("/add", async (req, res) => {
    const body = req.body;
    const newProduct = new Product();
    newProduct.title = body.title;
    newProduct.owner = body.owner;
    newProduct.price = body.price;
    newProduct.discountPrice = body.discountPrice;
    newProduct.description = body.description;

    const result = await newProduct.save();
    res.send(result);
});

module.exports = router;
