const express = require('express')
const User = require('../models/user')
const router = express.Router();
const auth = require('../middleware/authMiddleware')
// Creeate POST (Register User)
router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.send({ message: "User Registered Successfully", user })
    }
    catch (err) {
        res.status(400).send(err)
    }
})

// Read All Users (GET)
router.get('/list',auth, async (req, res) => {
    try {
        const users = await User.find();
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

// User By ID 
router.get('/userbyid/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.send(user)
        console.log("User by Id", user)
    } catch (error) {
        console.log("Error in getting user by Id", error)
    }
})

// User Update (PUT)
router.put('/update/:id', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body)
        res.send({ message: "User Updated successfully" })
    } catch (error) {
        res.status(400).send(error);
        console.log("Error in updating user", error)
    }
})

// User Delete (Delete)
router.delete('/delete/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.send({ message: "User Deleted Successfully" })
    } catch (error) {
        res.status(400).send(error);
        console.log("Error in Deleting user", error)
    }
})
module.exports = router;