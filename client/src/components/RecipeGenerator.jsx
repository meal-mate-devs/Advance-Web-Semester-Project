import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ChevronLeft,
  Sparkles,
  Loader2,
  Check,
  AlertCircle,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function RecipeGenerator() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [error, setError] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const promptExamples = [
    "A healthy vegetarian dinner with ingredients I likely have at home",
    "A quick dessert that takes less than 30 minutes to make",
    "A keto-friendly breakfast without eggs",
    "An Italian pasta dish that's kid-friendly",
    "A spicy Asian-inspired lunch",
  ];

  const generateRecipe = async () => {
    if (!prompt.trim()) {
      setError("Please enter a description for your recipe");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const isVegetarian = prompt.toLowerCase().includes("vegetarian");
      const isDessert = prompt.toLowerCase().includes("dessert");
      const isQuick = prompt.toLowerCase().includes("quick");
      const isKeto = prompt.toLowerCase().includes("keto");
      const isItalian = prompt.toLowerCase().includes("italian");
      const isSpicy = prompt.toLowerCase().includes("spicy");

      let recipeName,
        category,
        description,
        ingredients,
        instructions,
        difficulty,
        prepTime,
        cookTime;

      if (isDessert) {
        recipeName = isQuick ? "Quick Chocolate Mug Cake" : "Classic Tiramisu";
        category = "Dessert";
        description = isQuick
          ? "A delicious single-serve chocolate cake that cooks in your microwave in just minutes."
          : "A classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cream.";
        prepTime = isQuick ? "5" : "30";
        cookTime = isQuick ? "2" : "240";
        difficulty = isQuick ? "easy" : "medium";
        ingredients = isQuick
          ? [
              { name: "All-purpose flour", amount: "4", unit: "tbsp" },
              { name: "Sugar", amount: "2", unit: "tbsp" },
              { name: "Cocoa powder", amount: "2", unit: "tbsp" },
              { name: "Baking powder", amount: "1/4", unit: "tsp" },
              { name: "Salt", amount: "1/8", unit: "tsp" },
              { name: "Milk", amount: "5", unit: "tbsp" },
              { name: "Vegetable oil", amount: "2", unit: "tbsp" },
              { name: "Vanilla extract", amount: "1/4", unit: "tsp" },
              { name: "Chocolate chips", amount: "2", unit: "tbsp" },
            ]
          : [
              { name: "Egg yolks", amount: "6", unit: "piece" },
              { name: "Sugar", amount: "3/4", unit: "cup" },
              { name: "Mascarpone cheese", amount: "16", unit: "oz" },
              { name: "Heavy cream", amount: "1 1/4", unit: "cup" },
              { name: "Ladyfingers", amount: "24", unit: "piece" },
              { name: "Strong coffee", amount: "1 3/4", unit: "cup" },
              { name: "Cocoa powder", amount: "2", unit: "tbsp" },
              { name: "Vanilla extract", amount: "1", unit: "tsp" },
            ];
        instructions = isQuick
          ? [
              "In a large mug, whisk together the dry ingredients: flour, sugar, cocoa powder, baking powder, and salt.",
              "Add milk, vegetable oil, and vanilla extract. Mix until smooth.",
              "Stir in chocolate chips.",
              "Microwave on high for 90 seconds to 2 minutes, until cake has risen and is set in the middle.",
              "Let cool for 1 minute before enjoying.",
            ]
          : [
              "In a medium saucepan, whisk together egg yolks and sugar until well blended.",
              "Cook over medium heat, stirring constantly for about 10 minutes, until mixture thickens and coats the back of a spoon.",
              "Remove from heat and let cool slightly, then chill in refrigerator for 1 hour.",
              "In a large bowl, beat mascarpone cheese with vanilla until smooth.",
              "In another bowl, whip heavy cream to stiff peaks.",
              "Fold mascarpone mixture into the egg yolk mixture, then gently fold in the whipped cream.",
              "Dip each ladyfinger briefly into the coffee, then arrange in a single layer in a 9x13 inch baking dish.",
              "Spread half of the cream mixture over the ladyfingers, then repeat with another layer of coffee-dipped ladyfingers and cream.",
              "Cover and refrigerate for at least 4 hours or overnight.",
              "Dust with cocoa powder before serving.",
            ];
      } else if (isVegetarian) {
        recipeName = "Roasted Vegetable Buddha Bowl";
        category = "Vegetarian";
        description =
          "A nutritious and satisfying bowl filled with roasted vegetables, quinoa, and a creamy tahini dressing.";
        prepTime = "15";
        cookTime = "25";
        difficulty = "easy";
        ingredients = [
          { name: "Sweet potato", amount: "1", unit: "piece" },
          { name: "Broccoli florets", amount: "2", unit: "cup" },
          { name: "Chickpeas", amount: "1", unit: "can" },
          { name: "Quinoa", amount: "1", unit: "cup" },
          { name: "Olive oil", amount: "2", unit: "tbsp" },
          { name: "Cumin", amount: "1", unit: "tsp" },
          { name: "Paprika", amount: "1", unit: "tsp" },
          { name: "Salt", amount: "1", unit: "tsp" },
          { name: "Tahini", amount: "2", unit: "tbsp" },
          { name: "Lemon juice", amount: "1", unit: "tbsp" },
          { name: "Garlic", amount: "1", unit: "clove" },
          { name: "Water", amount: "2", unit: "tbsp" },
          { name: "Avocado", amount: "1", unit: "piece" },
        ];
        instructions = [
          "Preheat oven to 400°F (200°C).",
          "Peel and cube sweet potato. Toss with broccoli florets, drained chickpeas, olive oil, cumin, paprika, and salt.",
          "Spread vegetables on a baking sheet and roast for 25 minutes, stirring halfway through.",
          "Meanwhile, cook quinoa according to package instructions.",
          "Make the dressing by whisking together tahini, lemon juice, minced garlic, water, and a pinch of salt.",
          "Assemble bowls with quinoa as the base, roasted vegetables and chickpeas on top, sliced avocado, and a drizzle of tahini dressing.",
        ];
      } else if (isKeto) {
        recipeName = "Keto Breakfast Avocado Boats";
        category = "Breakfast";
        description =
          "Creamy avocados filled with bacon and eggs for a perfect keto-friendly breakfast without eggs.";
        prepTime = "10";
        cookTime = "15";
        difficulty = "easy";
        ingredients = [
          { name: "Avocados", amount: "2", unit: "piece" },
          { name: "Bacon", amount: "4", unit: "slice" },
          { name: "Eggs", amount: "2", unit: "piece" },
          { name: "Cheddar cheese", amount: "1/4", unit: "cup" },
          { name: "Salt", amount: "1/4", unit: "tsp" },
          { name: "Black pepper", amount: "1/4", unit: "tsp" },
          { name: "Red pepper flakes", amount: "1/8", unit: "tsp" },
        ];
        instructions = [
          "Preheat oven to 400°F (200°C).",
          "Cook bacon in a skillet until crispy. Let cool and chop into bits.",
          "Cut avocados in half and remove pits. Scoop out a small portion of each avocado half to make room for the filling.",
          "Place avocado halves in a baking dish, ensuring they're stable.",
          "Sprinkle bacon bits into each avocado cavity.",
          "Carefully crack an egg into each avocado half.",
          "Sprinkle with cheese, salt, pepper, and red pepper flakes.",
          "Bake for 12-15 minutes until egg whites are set but yolks are still runny.",
          "Serve immediately while warm.",
        ];
      } else if (isItalian) {
        recipeName = "Kid-Friendly Creamy Tomato Pasta";
        category = "Main Course";
        description =
          "A smooth and creamy tomato pasta that even the pickiest eaters will love.";
        prepTime = "10";
        cookTime = "20";
        difficulty = "easy";
        ingredients = [
          { name: "Penne pasta", amount: "12", unit: "oz" },
          { name: "Olive oil", amount: "2", unit: "tbsp" },
          { name: "Garlic", amount: "2", unit: "clove" },
          { name: "Crushed tomatoes", amount: "1", unit: "can" },
          { name: "Heavy cream", amount: "1/2", unit: "cup" },
          { name: "Butter", amount: "2", unit: "tbsp" },
          { name: "Parmesan cheese", amount: "1/2", unit: "cup" },
          { name: "Basil leaves", amount: "1/4", unit: "cup" },
          { name: "Salt", amount: "1", unit: "tsp" },
          { name: "Black pepper", amount: "1/4", unit: "tsp" },
        ];
        instructions = [
          "Cook pasta according to package directions until al dente. Reserve 1/2 cup of pasta water before draining.",
          "In a large skillet, heat olive oil over medium heat. Add minced garlic and cook for 30 seconds until fragrant.",
          "Add crushed tomatoes and simmer for 5 minutes.",
          "Reduce heat to low and stir in heavy cream and butter until smooth.",
          "Add drained pasta to the sauce and toss to coat. Add pasta water as needed if sauce is too thick.",
          "Remove from heat and stir in grated Parmesan cheese and torn basil leaves.",
          "Season with salt and pepper to taste. Serve with additional Parmesan if desired.",
        ];
      } else if (isSpicy) {
        recipeName = "Spicy Asian-Inspired Noodle Bowl";
        category = "Lunch";
        description =
          "A quick and flavorful noodle bowl with a spicy sauce and fresh vegetables.";
        prepTime = "15";
        cookTime = "10";
        difficulty = "medium";
        ingredients = [
          { name: "Rice noodles", amount: "8", unit: "oz" },
          { name: "Sesame oil", amount: "2", unit: "tbsp" },
          { name: "Garlic", amount: "3", unit: "clove" },
          { name: "Ginger", amount: "1", unit: "tbsp" },
          { name: "Red bell pepper", amount: "1", unit: "piece" },
          { name: "Carrots", amount: "2", unit: "piece" },
          { name: "Green onions", amount: "4", unit: "piece" },
          { name: "Soy sauce", amount: "3", unit: "tbsp" },
          { name: "Sriracha", amount: "2", unit: "tbsp" },
          { name: "Rice vinegar", amount: "1", unit: "tbsp" },
          { name: "Brown sugar", amount: "1", unit: "tbsp" },
          { name: "Lime", amount: "1", unit: "piece" },
          { name: "Cilantro", amount: "1/4", unit: "cup" },
          { name: "Peanuts", amount: "1/4", unit: "cup" },
        ];
        instructions = [
          "Cook rice noodles according to package directions. Drain and rinse with cold water.",
          "In a small bowl, mix soy sauce, sriracha, rice vinegar, and brown sugar to make the sauce.",
          "Heat sesame oil in a large wok or skillet over high heat.",
          "Add minced garlic and ginger, stir-fry for 30 seconds until fragrant.",
          "Add sliced bell pepper and julienned carrots, stir-fry for 2-3 minutes until slightly softened.",
          "Add noodles and sauce to the wok, tossing to combine and heat through.",
          "Remove from heat and squeeze lime juice over the noodles.",
          "Serve garnished with sliced green onions, chopped cilantro, and crushed peanuts.",
        ];
      } else {
        recipeName = "Classic Chicken Stir Fry";
        category = "Dinner";
        description =
          "A simple and delicious chicken stir fry with fresh vegetables and a savory sauce.";
        prepTime = "15";
        cookTime = "15";
        difficulty = "medium";
        ingredients = [
          { name: "Chicken breast", amount: "1", unit: "lb" },
          { name: "Broccoli", amount: "2", unit: "cup" },
          { name: "Carrots", amount: "2", unit: "piece" },
          { name: "Bell pepper", amount: "1", unit: "piece" },
          { name: "Garlic", amount: "3", unit: "clove" },
          { name: "Ginger", amount: "1", unit: "tbsp" },
          { name: "Soy sauce", amount: "3", unit: "tbsp" },
          { name: "Honey", amount: "1", unit: "tbsp" },
          { name: "Cornstarch", amount: "1", unit: "tbsp" },
          { name: "Vegetable oil", amount: "2", unit: "tbsp" },
          { name: "Salt", amount: "1/2", unit: "tsp" },
          { name: "Black pepper", amount: "1/4", unit: "tsp" },
        ];
        instructions = [
          "Slice chicken breast into thin strips. Season with salt and pepper.",
          "In a small bowl, mix soy sauce, honey, and cornstarch to make the sauce.",
          "Heat oil in a large wok or skillet over high heat.",
          "Add chicken and stir-fry until no longer pink, about 5-6 minutes. Remove and set aside.",
          "In the same pan, add garlic and ginger, stir-fry for 30 seconds.",
          "Add broccoli, carrots, and bell peppers. Stir-fry for 4-5 minutes until vegetables are crisp-tender.",
          "Return chicken to the pan, add sauce and toss to combine until sauce thickens.",
          "Serve hot over rice or noodles.",
        ];
      }

      setGeneratedRecipe({
        title: recipeName,
        description,
        preparationTime: prepTime,
        cookingTime: cookTime,
        servings: 4,
        difficulty,
        category,
        imageUrl: "",
        ingredients,
        instructions,
      });
    } catch (error) {
      console.error("Error generating recipe:", error);
      setError("Failed to generate recipe. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const saveRecipe = async () => {
    console.log("32423423");
    if (!generatedRecipe) {
      setError("No recipe to save.");
      return;
    }

    if (!isAuthenticated || !user) {
      setError("You must be logged in to save recipes.");
      navigate("/login");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/recipes", {
        ...generatedRecipe,
        userId: user._id,
      });

      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);

      setGeneratedRecipe(null);
      setPrompt("");

      setTimeout(() => {
        navigate("/recipes");
      }, 1000);
    } catch (error) {
      console.error(
        "Error saving recipe:",
        error.response?.data?.message || error.message
      );
      setError(
        error.response?.data?.message ||
          "Failed to save recipe. Please try again."
      );
    }
  };

  const SuccessToast = () => (
    <div className="fixed bottom-4 right-4 bg-emerald-50 border border-emerald-200 text-emerald-800 py-3 px-4 rounded-md shadow-md flex items-center z-50">
      <Check className="h-5 w-5 text-emerald-500 mr-2" />
      <span>Recipe saved successfully!</span>
      <button
        onClick={() => setShowSuccessToast(false)}
        className="ml-3 text-emerald-600 hover:text-emerald-800"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 text-gray-500 hover:text-emerald-500"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">
              AI Recipe Generator
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!generatedRecipe ? (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-6">
              <Sparkles className="h-6 w-6 text-emerald-500 mr-2" />
              <h2 className="text-lg font-bold text-gray-800">
                Generate a Recipe with AI
              </h2>
            </div>

            <p className="text-gray-600 mb-6">
              Describe what kind of recipe you're looking for, and our AI will
              create a detailed recipe for you. Include details like cuisine
              type, dietary restrictions, meal type, or specific ingredients.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="prompt"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Recipe Description
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Describe the recipe you want to create..."
              />
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Examples:</p>
              <div className="flex flex-wrap gap-2">
                {promptExamples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(example)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded-md transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={generateRecipe}
                disabled={isGenerating}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 flex items-center ${
                  isGenerating ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Recipe
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-800">
                  Generated Recipe
                </h2>
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  AI Generated
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {generatedRecipe.title}
                </h3>
                <p className="text-gray-600">{generatedRecipe.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 sm:grid-cols-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-xs text-gray-500">Prep Time</p>
                  <p className="font-medium">
                    {generatedRecipe.preparationTime} min
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-xs text-gray-500">Cook Time</p>
                  <p className="font-medium">
                    {generatedRecipe.cookingTime} min
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-xs text-gray-500">Servings</p>
                  <p className="font-medium">{generatedRecipe.servings}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-xs text-gray-500">Difficulty</p>
                  <p className="font-medium capitalize">
                    {generatedRecipe.difficulty}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-md font-semibold text-gray-800 mb-3">
                  Ingredients
                </h4>
                <ul className="space-y-2">
                  {generatedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 mr-2"></span>
                      <span>
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-md font-semibold text-gray-800 mb-3">
                  Instructions
                </h4>
                <ol className="space-y-3">
                  {generatedRecipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 font-medium text-sm mr-3 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setGeneratedRecipe(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  Try Again
                </button>
                <button
                  onClick={saveRecipe}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  Save Recipe
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showSuccessToast && <SuccessToast />}
    </div>
  );
}
