const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/community");

// Authentication Routes
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  res.status(201).send(user);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).send(user);
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
