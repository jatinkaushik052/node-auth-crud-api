const express = require('express');
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { route } = require('./userRoutes');
const router = express.Router();

// User Register
router.post('/register_user', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // check email exist or not
        const isExistingUser = await User.findOne({ email })
        if (isExistingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        // Password Hashing/encryption
        const hashedPassword = await bcrypt.hash(password, 10);

        // now create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(200).send({ message: "User Registered Successfully",user  })
    } catch (error) {
        res.status(500).send(error);
        console.log("Error in Registering ", error)
    }
})

// Now User Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // check user exist or not 
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send({ message: "User Does not Exist" })
        const validPassword = await bcrypt.compareSync(password, user.password)
        if (!validPassword) return res.status(400).send({ message: "Invalid Password" });

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            "secretKey", // this is used .env in  prod
            { expiresIn: "1h" }
        );
        res.send({ message: "Login Successfull", token })
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router