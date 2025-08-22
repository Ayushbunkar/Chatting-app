import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Otp from '../models/OtpModels.js';
import nodemailer from 'nodemailer';
// Helper to send OTP email using Gmail
const sendOtpEmail = async (email, otp) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'ChatApp OTP Verification',
    text: `Hello from ChatApp!\n\nYour One-Time Password (OTP) is: ${otp}\n\nPlease enter this OTP within 5 minutes to complete your registration. After 5 minutes, the OTP will expire for security reasons.\n\nIf you did not request this, please ignore this email.\n\nThank you,\nChatApp Team`,
  });
};
// Send OTP endpoint
// Registration: store info in OTP model and send OTP
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.deleteMany({ email }); // Remove old OTPs
    await Otp.create({ email, otp, name, password: hashedPassword });
    await sendOtpEmail(email, otp);
    res.json({ message: 'OTP sent! Please verify OTP to complete registration.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// Verify OTP endpoint
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = await Otp.findOne({ email, otp });
    if (!record) return res.status(400).json({ message: 'Invalid or expired OTP' });
    const user = await User.findOne({ email });
    if (user && !record.name && !record.password) {
      // Login OTP flow
      const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1d' });
      await Otp.deleteMany({ email });
      return res.json({ message: 'OTP verified! Login complete.', token, user: { id: user._id, name: user.name, email: user.email } });
    }
    if (!user && record.name && record.password) {
      // Registration OTP flow
      const newUser = new User({ name: record.name, email, password: record.password });
      await newUser.save();
      await Otp.deleteMany({ email });
      return res.json({ message: 'OTP verified! Account activated.' });
    }
    await Otp.deleteMany({ email });
    return res.status(400).json({ message: 'OTP verification failed.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
});

// Register
// Registration logic moved to above

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    // Send OTP for login
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.deleteMany({ email }); // Remove old OTPs
    await Otp.create({ email, otp });
    await sendOtpEmail(email, otp);
    res.json({ message: 'OTP sent! Please verify OTP to complete login.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});



// Google Login
router.post('/google-login', async (req, res) => {
  try {
    const { name, email, googleId } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, password: googleId }); // Save googleId as password (not secure, just for demo)
      await user.save();
    }
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
