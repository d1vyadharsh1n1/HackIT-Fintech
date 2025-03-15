const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  riskProfile: { type: String, default: "Medium" },
});

const User = mongoose.model("User", UserSchema);

// Register API
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login API
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "User not found. Please register first." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        riskProfile: user.riskProfile,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update Risk Profile API
app.put("/api/risk-profile", async (req, res) => {
  const { email, riskProfile } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { riskProfile },
      { new: true }
    );
    if (!user) return res.status(400).json({ message: "User not found" });

    res.json({
      message: "Risk profile updated successfully",
      riskProfile: user.riskProfile,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Community Posts API (Dummy Data)
app.get("/api/community", async (req, res) => {
  res.json([
    { id: 1, user: "Alice", post: "I just started investing! Any tips?" },
    { id: 2, user: "Bob", post: "Anyone using AI for stock predictions?" },
  ]);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
