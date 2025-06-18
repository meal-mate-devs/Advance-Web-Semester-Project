const getUserProfile = (req, res) => {
    if (req.user) {
        res.json({
            _id: req.user._id,
            name: req.user.username,
            email: req.user.email,
            isActive: true,
            role: req.user.role

        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = {
    getUserProfile,
};