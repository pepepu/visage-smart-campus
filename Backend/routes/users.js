const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');
const { verifyToken } = require('./auth');

const router = express.Router();

// Get all users with their roles - Updated for your schema
router.get('/', async (req, res) => {
  try {
    const [users] = await pool.execute(`
      SELECT 
        u.user_id,
        u.id_number,
        u.full_name,
        u.email,
        u.course,
        u.is_active,
        u.created_at,
        r.role_name
      FROM Users u
      JOIN Roles r ON u.role_id = r.role_id
      ORDER BY u.created_at DESC
    `);

    res.json({
      success: true,
      count: users.length,
      users: users.map(user => ({
        id: user.user_id,
        username: user.id_number,
        fullName: user.full_name,
        email: user.email,
        course: user.course,
        role: user.role_name,
        isActive: user.is_active,
        createdAt: user.created_at
      }))
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch users' 
    });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [users] = await pool.execute(`
      SELECT 
        u.user_id,
        u.id_number,
        u.full_name,
        u.email,
        u.course,
        u.is_active,
        u.created_at,
        r.role_name
      FROM Users u
      JOIN Roles r ON u.role_id = r.role_id
      WHERE u.user_id = ?
    `, [id]);

    if (users.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }

    const user = users[0];

    res.json({ 
      success: true, 
      user: {
        id: user.user_id,
        username: user.id_number,
        fullName: user.full_name,
        email: user.email,
        course: user.course,
        role: user.role_name,
        isActive: user.is_active,
        createdAt: user.created_at
      }
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch user' 
    });
  }
});

// Create new user
router.post('/', [
  body('id_number').isLength({ min: 3 }).trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('full_name').trim().escape(),
  body('course').optional().trim().escape(),
  body('role_id').isInt({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const {
      id_number,
      email,
      password,
      full_name,
      course,
      role_id
    } = req.body;

    // Check if id_number or email already exists
    const [existingUsers] = await pool.execute(
      'SELECT user_id FROM Users WHERE id_number = ? OR email = ?',
      [id_number, email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'ID Number or email already exists' 
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await pool.execute(`
      INSERT INTO Users (id_number, email, password_hash, full_name, course, role_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [id_number, email, passwordHash, full_name, course, role_id]);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user_id: result.insertId
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create user' 
    });
  }
});

// Update user
router.put('/:id', [
  body('full_name').optional().trim().escape(),
  body('course').optional().trim().escape(),
  body('role_id').optional().isInt({ min: 1 }),
  body('is_active').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { id } = req.params;
    const updateFields = req.body;
    
    // Remove undefined fields
    Object.keys(updateFields).forEach(key => 
      updateFields[key] === undefined && delete updateFields[key]
    );

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'No valid fields to update' 
      });
    }

    // Build update query
    const setClause = Object.keys(updateFields)
      .map(key => `${key} = ?`)
      .join(', ');
    
    const values = Object.values(updateFields);
    values.push(id);

    await pool.execute(`
      UPDATE Users 
      SET ${setClause}
      WHERE user_id = ?
    `, values);

    res.json({
      success: true,
      message: 'User updated successfully'
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update user' 
    });
  }
});

// Update user profile (for users to update their own profile)
router.put('/profile', verifyToken, [
  body('fullName').optional().trim().escape(),
  body('email').optional().isEmail().normalizeEmail(),
  body('course').optional().trim().escape()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    // Get user from JWT token (this should be set by auth middleware)
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        error: 'Authentication required' 
      });
    }

    const { fullName, email, course } = req.body;
    const updateFields = {};
    
    // Only include fields that are provided
    if (fullName !== undefined) updateFields.full_name = fullName;
    if (email !== undefined) updateFields.email = email;
    if (course !== undefined) updateFields.course = course;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'No valid fields to update' 
      });
    }

    // Check if email is already taken by another user
    if (email) {
      const [existingUsers] = await pool.execute(
        'SELECT user_id FROM Users WHERE email = ? AND user_id != ?',
        [email, userId]
      );

      if (existingUsers.length > 0) {
        return res.status(400).json({ 
          success: false, 
          error: 'Email already exists' 
        });
      }
    }

    // Build update query
    const setClause = Object.keys(updateFields)
      .map(key => `${key} = ?`)
      .join(', ');
    
    const values = Object.values(updateFields);
    values.push(userId);

    await pool.execute(`
      UPDATE Users 
      SET ${setClause}
      WHERE user_id = ?
    `, values);

    res.json({
      success: true,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update profile' 
    });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user exists
    const [users] = await pool.execute(
      'SELECT user_id FROM Users WHERE user_id = ?',
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }

    // Delete user
    await pool.execute('DELETE FROM Users WHERE user_id = ?', [id]);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete user' 
    });
  }
});

module.exports = router;