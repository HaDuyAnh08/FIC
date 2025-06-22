const axios = require('axios');
const jwt = require('jsonwebtoken');
const { oauth2Client } = require('../../config/googleClient');
const User = require('../../models/User');

const userGoogle = async ({ name, email, picture }) => {
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ name, email, image: picture });
  }
  return user;
};

exports.googleAuth = async (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    scope: ['profile', 'email'],
    redirect_uri: process.env.GOOGLE_CALLBACK_URL,
  });
  res.json({ authUrl });
};

exports.googleCallback = async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).json({ message: 'Missing authorization code' });
  }
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
    );
    const { email, name, picture } = userRes.data;

    const user = await userGoogle({ name, email, picture });
    const token = jwt.sign({ _id: user._id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT || '1h',
    });
    res.redirect(`http://localhost:5173?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`);
  } catch (error) {
    console.error('Callback error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};