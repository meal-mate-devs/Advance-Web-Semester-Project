const Recipe = require('../models/Recipe');
const createRecipe = async (req, res) => {
    try {
        const {
            title,
            description,
            preparationTime,
            cookingTime,
            servings,
            difficulty,
            category,
            imageUrl,
            ingredients,
            instructions,
        } = req.body;

        if (!title || !description || !preparationTime || !cookingTime || !servings || !difficulty || !category || !ingredients || ingredients.length === 0 || !instructions || instructions.length === 0) {
            return res.status(400).json({ message: 'Please fill in all required recipe fields.' });
        }

        const newRecipe = new Recipe({
            userId: req.user.id,
            title,
            description,
            preparationTime,
            cookingTime,
            servings,
            difficulty,
            category,
            imageUrl,
            ingredients,
            instructions,
        });

        const savedRecipe = await newRecipe.save();
        res.status(201).json({ message: 'Recipe saved successfully!', recipe: savedRecipe });
    } catch (error) {
        console.error('Error saving recipe:', error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server error while saving recipe.' });
    }
};

const getUserRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error fetching user recipes:', error);
        res.status(500).json({ message: 'Server error while fetching recipes.' });
    }
};


const getRecipeById = async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
        res.json(recipe);
    } else {
        res.status(404);
        throw new Error('Recipe not found');
    }
};


module.exports = {
    createRecipe,
    getUserRecipes,
    getRecipeById
};
