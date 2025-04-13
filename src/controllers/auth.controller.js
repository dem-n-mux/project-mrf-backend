import USER from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtUtils.js";
import { sendEmail } from "../utils/emailer.js";

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await USER.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const accessToken = generateToken(user);

    return res.status(200).json({
      message: "Login successful",
      token: accessToken,
      result: {
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { fullname, email, role } = req.body;

    if (!fullname || !email || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await USER.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const password = Math.random().toString(36).slice(-8);

    const username =
      fullname.toLowerCase().replace(/\s+/g, "_") +
      Math.floor(1000 + Math.random() * 9000);

    const emailSubject = "Welcome to Our Service";
    const emailBody = `Hello ${fullname},\n\nYour account has been created successfully.\n\nYour Username is: ${username}\n\nYour password is: ${password}\n\nPlease change your password after logging in.\n\nBest regards,\nProject MRF Team`;
    await sendEmail(email, emailSubject, emailBody);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new USER({
      fullname,
      email,
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
