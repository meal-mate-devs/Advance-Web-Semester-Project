const Chef = require('../models/Chef');
const User = require('../models/User');

const registerChef = async (req, res, next) => {
    try {
        const { bio, specialty, profilePictureUrl } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            res.status(404);
            res.status(404).json({ message: 'User not found' });

        }

        if (user.role === 'chef') {
            res.status(404).json({ message: 'User is already registered as a chef' });

        }

        const chef = await Chef.create({
            userId,
            bio,
            specialty,
            profilePictureUrl,
        });

        user.role = 'chef';
        await user.save();

        res.status(201).json({
            message: 'Successfully registered as a chef!',
            chef: chef,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        throw new error;

    }
};

const getChefProfile = async (req, res, next) => {
    try {
        const chef = await Chef.findOne({ userId: req.params.userId }).populate('userId', 'username email role');

        if (chef) {
            res.json(chef);
        } else {
            res.status(404).json({ message: 'Chef profile not found' });
        }
    } catch (error) {
        throw new error;
    }
};

module.exports = {
    registerChef,
    getChefProfile,
};
