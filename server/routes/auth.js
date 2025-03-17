// server/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const sendEmail = require('../utils/emailSender');
const router = express.Router();

// Get JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// @route   POST /api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user (password hashing happens in the User model pre-save hook)
    const user = await User.create({
      name,
      email,
      password
    });
    
    // Generate email verification token
    const verificationToken = user.generateEmailVerificationToken();
    await user.save();
    
    // Create verification URL (append token as a query parameter instead)
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    
    // Prepare email content
    const message = `
      Hello ${user.name},
      
      Thank you for registering with Neurofy. Please verify your email address by clicking the link below:
      
      ${verificationUrl}
      
      If you did not create this account, please ignore this email.
      
      Best regards,
      The Neurofy Team
    `;
    
    // Send verification email
    try {
      await sendEmail({
        email: user.email,
        subject: 'Neurofy - Email Verification',
        message,
        html: `
          <h1>Verify Your Email</h1>
          <p>Hello ${user.name},</p>
          <p>Thank you for registering with Neurofy. Please verify your email address by clicking the link below:</p>
          <p><a href="${verificationUrl}" style="padding: 10px 15px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a></p>
          <p>If you did not create this account, please ignore this email.</p>
          <p>Best regards,<br>The Neurofy Team</p>
        `
      });
      
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1d' }
      );
      
      // Send back user data without password
      res.status(201).json({
        message: 'User registered successfully. Please check your email to verify your account.',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isEmailVerified: user.isEmailVerified
        }
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      
      // If email fails, still create the user but notify about email issue
      res.status(201).json({
        message: 'User registered successfully, but there was an issue sending the verification email. Please contact support.',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isEmailVerified: user.isEmailVerified
        }
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    
    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    // Send back user data without password
    res.json({
      message: user.isEmailVerified ? 'Login successful' : 'Login successful. Please verify your email.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/auth/verify-email/:token
// @desc    Verify email address
// @access  Public
router.get('/verify-email/:token', async (req, res) => {
  try {
    // Get token from params
    const verificationToken = req.params.token;
    console.log('Raw token received:', verificationToken);
    
    // Get hashed token
    const emailVerificationToken = crypto
      .createHash('sha256')
      .update(verificationToken)
      .digest('hex');
    
    console.log('Looking for token (hashed):', emailVerificationToken);
    
    // Find user with matching token and unexpired token
    const user = await User.findOne({
      emailVerificationToken,
      emailVerificationExpire: { $gt: Date.now() }
    });
    
    if (!user) {
      console.log('No user found with valid token or token expired');
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
    
    console.log('User found, verifying email for:', user.email);
    
    // Set email as verified and remove verification fields
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;
    await user.save();
    
    console.log('Email verified successfully for user:', user.email);
    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/auth/resend-verification
// @desc    Resend verification email
// @access  Private
router.post('/resend-verification', authenticateToken, async (req, res) => {
  try {
    // Find the user
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if email is already verified
    if (user.isEmailVerified) {
      return res.status(400).json({ message: 'Email is already verified' });
    }
    
    // Generate new email verification token
    const verificationToken = user.generateEmailVerificationToken();
    await user.save();
    
    // Create verification URL
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    
    // Prepare email content
    const message = `
      Hello ${user.name},
      
      Please verify your email address by clicking the link below:
      
      ${verificationUrl}
      
      If you did not create this account, please ignore this email.
      
      Best regards,
      The Neurofy Team
    `;
    
    // Send verification email
    try {
      await sendEmail({
        email: user.email,
        subject: 'Neurofy - Email Verification',
        message,
        html: `
          <h1>Verify Your Email</h1>
          <p>Hello ${user.name},</p>
          <p>Please verify your email address by clicking the link below:</p>
          <p><a href="${verificationUrl}" style="padding: 10px 15px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a></p>
          <p>If you did not create this account, please ignore this email.</p>
          <p>Best regards,<br>The Neurofy Team</p>
        `
      });
      
      res.json({ message: 'Verification email sent successfully' });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      res.status(500).json({ message: 'Error sending verification email' });
    }
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Please provide an email address' });
    }
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'No user found with that email' });
    }
    
    // Generate reset token
    const resetToken = user.generateResetPasswordToken();
    await user.save();
    
    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    
    // Prepare email content
    const message = `
      Hello ${user.name},
      
      You are receiving this email because you (or someone else) has requested to reset your password.
      
      Please click the link below to reset your password. This link will expire in 10 minutes:
      
      ${resetUrl}
      
      If you did not request this, please ignore this email and your password will remain unchanged.
      
      Best regards,
      The Neurofy Team
    `;
    
    try {
      await sendEmail({
        email: user.email,
        subject: 'Neurofy - Password Reset',
        message,
        html: `
          <h1>Password Reset</h1>
          <p>Hello ${user.name},</p>
          <p>You are receiving this email because you (or someone else) has requested to reset your password.</p>
          <p>Please click the button below to reset your password. This link will expire in 10 minutes:</p>
          <p><a href="${resetUrl}" style="padding: 10px 15px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
          <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
          <p>Best regards,<br>The Neurofy Team</p>
        `
      });
      
      res.json({ message: 'Password reset email sent' });
    } catch (emailError) {
      console.error('Password reset email error:', emailError);
      
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      
      return res.status(500).json({ message: 'Email could not be sent' });
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/auth/reset-password/:token
// @desc    Reset password
// @access  Public
router.put('/reset-password/:token', async (req, res) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
    
    // Find user with matching token and unexpired token
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
    
    // Set new password and remove reset fields
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    
    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', authenticateToken, async (req, res) => {
  try {
    // Find the user but don't return the password
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    
    req.user = decoded;
    next();
  });
}

module.exports = router;