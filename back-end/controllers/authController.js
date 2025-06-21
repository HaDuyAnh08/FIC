const axios = require('axios');
const jwt = require('jsonwebtoken');
const { oauth2Client } = require('../config/googleClient');
const User = require('../models/User');

const userGoogle = async ({ name, email, picture }) => {
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ name, email, image: picture });
  }
  return user;
};

exports.googleAuth = async (req, res) => {
  const { redirect_uri } = req.query; // Nhận redirect_uri từ frontend
  const authUrl = oauth2Client.generateAuthUrl({
    scope: ['profile', 'email'],
    redirect_uri: redirect_uri || 'http://localhost:5173', // Default redirect
  });
  res.json({ authUrl }); // Trả về URL để frontend redirect
};

exports.googleCallback = async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    const { email, name, picture } = userRes.data;

    const user = await userGoogle({ name, email, picture });
    const token = jwt.sign({ _id: user._id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT || '1h',
    });
    // Lưu token vào localStorage hoặc cookie (tùy chọn)
    res.redirect(`${redirect_uri || 'http://localhost:5173'}?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};