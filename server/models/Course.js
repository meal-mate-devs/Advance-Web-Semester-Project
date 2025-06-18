const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    chefId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chef',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    recipeIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe',
        }
    ],
    coverImageUrl: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Course', CourseSchema);
