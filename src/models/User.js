const mongoose = require("mongoose");

const validateEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: [validateEmail, "invalid email"],
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
});

module.exports = mongoose.model("user", schema);
