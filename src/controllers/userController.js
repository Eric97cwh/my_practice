import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


const registerUser = async (req, res) => {
    try {
        const { name, email, password, role_type } = req.body;
        
        const existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(409).json({ status: 409, message: "User with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role_type: role_type
        });
        
        if (newUser) {
            res.status(201).json({
                status: 201,
                message: "User created successfully",
                result: {
                    user_id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    role_type: newUser.role_type
                }
            });
        } else {
            res.status(500).json({ status: 500, message: "Failed to create user" });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ status: 500, message: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
      // Input validation
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          status: 400,
          message: "Email and password are required",
        });
      }
  
      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({
          status: 401,
          message: "Authentication failed. User not found.",
        });
      }
  
      // Validate password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          status: 401,
          message: "Authentication failed. Wrong password.",
        });
      }
  
      // Generate JWT
      const token = jwt.sign(
        {
          userId: user.id,
          role_type: user.role_type,
          email: user.email,
        },
        process.env.JWT_SECRET || "jwt_secret", // Use env variable with fallback
        { expiresIn: "1h" }
      );
  
      // Calculate expiration dynamically
      const expiresInMs = 60 * 60 * 1000; // 1 hour in milliseconds
      const expiresAt = new Date(Date.now() + expiresInMs).toISOString();
  
      // Success response
      res.status(200).json({
        status: 200,
        message: "Logged in successfully",
        result: {
          user_id: user.id,
          access_token: token,
          token_type: "Bearer",
          role_type: user.role_type,
          expires_at: expiresAt,
        },
      });
    } catch (error) {
      // Log error (consider a logging library in production)
      console.error("Error during login:", error);
  
      // Generic error response
      res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  };

  const listUser = async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'created_at', 'updated_at'],
        order: [['id', 'ASC']]
      });
      
      if (users.length === 0) {
        return res.status(200).json({
          status: 200,
          message: 'No users found',
          result: []
        });
      }
  
      res.status(200).json({
        status: 200,
        message: 'Users listed successfully',
        result: users
      });
    } catch (error) {
      console.error("Error while retrieving data:", error);
      res.status(500).json({
        status: 500,
        message: "Error while retrieving data"
      });
    }
  };
  

export default {
    registerUser,
    login,
    listUser
};