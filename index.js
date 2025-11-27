const express = require('express');
const cors = require('cors')
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")
const app = express();
app.use(cors());
app.use(express.json());

connectDB();
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(5000, () => {
    console.log("Server is runnign on port 5000")
})