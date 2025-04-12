import User from "../Models/User.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, rnumber, department, email, password } = req.body;
    if (!name || !rnumber || !department || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ rnumber }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email or Rnumber is already present" });
    }

    const newuser = new User({
      name,
      rnumber,
      email,
      department,
      password,
    });
    await newuser.save();
    res.status(200).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.TokenKey,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserForDashboard = async (req, res) => {
  try {
    const users = await User.find().limit(4);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    const users = await User.find().limit(4);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const NewMembers = async (req, res) => {
  try {
    const members = await User.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    });

    res.status(200).json({
      members,
      message: "New Members Get Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const userNames = async (req, res) => {
  try {
    const user = await User.find({}).select("name _id");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



