const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: String, required: true },
    unit: { type: String, required: true },
}, { _id: false });

const RecipeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: [true, 'Recipe title is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Recipe description is required'],
        trim: true,
    },
    preparationTime: {
        type: String,
        required: [true, 'Preparation time is required'],
    },
    cookingTime: {
        type: String,
        required: [true, 'Cooking time is required'],
    },
    servings: {
        type: Number,
        required: [true, 'Number of servings is required'],
        min: [1, 'Servings must be at least 1'],
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: [true, 'Difficulty is required'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
    },
    imageUrl: {
        type: String,
        default: '',
    },
    ingredients: {
        type: [IngredientSchema],
        required: [true, 'Ingredients are required'],
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'A recipe must have at least one ingredient.'
        }
    },
    instructions: {
        type: [String],
        required: [true, 'Instructions are required'],
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'A recipe must have at least one instruction.'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Recipe', RecipeSchema);
