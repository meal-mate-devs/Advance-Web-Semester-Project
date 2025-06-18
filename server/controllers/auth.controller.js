const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const existingUserByEmail = await User.findOne({ email });
        const existingUserByUsername = await User.findOne({ username });

        if (existingUserByEmail) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        if (existingUserByUsername) {
            return res.status(400).json({
                success: false,
                message: 'Username already taken'
            });
        }

        const user = await User.create({
            username,
            email,
            password
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        if (!user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Account deactivated'
            });
        }

        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        user.lastLogin = new Date();
        await user.save();

        const token = generateToken(user._id);
        user.password = undefined;

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user
        });
    } catch (error) {
        next(error);
    }
};

const resetPassowrd = async (req, res) => {
    const { password } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
        }

        user.password = password;

        await user.save();

        res.json({ message: 'Password has been successfully reset!' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Server error during password reset' });
    }
}

module.exports = {
    register,
    login,
    resetPassowrd
}