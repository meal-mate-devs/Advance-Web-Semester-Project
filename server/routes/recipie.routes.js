const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/protect');
const { createRecipe, getUserRecipes, getRecipeById } = require('../controllers/recipie.controller');

router.post('/', protect, createRecipe);
router.get('/', protect, getUserRecipes);
router.get('/:id', protect, getRecipeById);


module.exports = router;
