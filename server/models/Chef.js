const mongoose = require('mongoose');

const ChefSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 500,
    },
    specialty: {
        type: String,
        trim: true,
        maxlength: 100,
    },
    profilePictureUrl: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Chef', ChefSchema);
