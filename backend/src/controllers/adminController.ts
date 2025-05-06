import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Simple admin credentials
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
  id: '1'
};

// Generate JWT Token
const generateToken = (id: string): string => {
  return jwt.sign(
    { id },
    'portfolio_secret_key_2024',
    { expiresIn: '7d' }
  );
};

// @desc    Login admin
// @route   POST /api/admin/login
// @access  Public
export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt for username:', username);

    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide username and password' });
    }

    // Simple credential check
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const token = generateToken(ADMIN_CREDENTIALS.id);
      console.log('Login successful for user:', username);

      res.json({
        id: ADMIN_CREDENTIALS.id,
        username: ADMIN_CREDENTIALS.username,
        isAdmin: true,
        token,
      });
    } else {
      console.log('Invalid credentials');
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private/Admin
export const getAdminProfile = async (req: Request, res: Response) => {
  try {
    res.json({
      id: ADMIN_CREDENTIALS.id,
      username: ADMIN_CREDENTIALS.username,
      isAdmin: true,
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update admin username and password
// @route   PUT /api/admin/update
// @access  Private/Admin
export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Update credentials
    ADMIN_CREDENTIALS.username = username || ADMIN_CREDENTIALS.username;
    ADMIN_CREDENTIALS.password = password || ADMIN_CREDENTIALS.password;

    res.json({
      id: ADMIN_CREDENTIALS.id,
      username: ADMIN_CREDENTIALS.username,
      isAdmin: true,
      token: generateToken(ADMIN_CREDENTIALS.id),
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
