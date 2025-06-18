import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useGlobalContext } from "../context/GlobalContext";
import { Heart, Clock, Users, ChevronLeft, AlertCircle } from "lucide-react";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { favRecipes, setFavRecipes } = useGlobalContext();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (authLoading) {
        return;
      }

      if (!isAuthenticated || !user || !user._id) {
        setError("You must be logged in to view recipe details.");
        setLoading(false);
        navigate("/login");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `http://localhost:3000/api/recipes/${id}`
        );
        setRecipe(response.data);
        setIsFavorite(favRecipes.some((fav) => fav._id === response.data._id));
      } catch (err) {
        console.error(
          "Error fetching recipe details:",
          err.response?.data?.message || err.message
        );
        setError(
          err.response?.data?.message ||
            "Failed to load recipe details. It might not exist or you don't have access."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id, isAuthenticated, authLoading, user, navigate, favRecipes]);

  const calculateTotalTime = () => {
    const prepTime = parseInt(recipe?.preparationTime) || 0;
    const cookTime = parseInt(recipe?.cookingTime) || 0;
    return prepTime + cookTime;
  };

  const toggleFavorite = () => {
    if (!recipe) return;

    if (isFavorite) {
      setFavRecipes(favRecipes.filter((fav) => fav._id !== recipe._id));
      setIsFavorite(false);
    } else {
      setFavRecipes([...favRecipes, recipe]);
      setIsFavorite(true);
    }
  };

  const getDifficultyColor = () => {
    if (!recipe) return "";

    switch (recipe.difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-lg text-gray-700">Loading recipe...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center flex flex-col items-center h-[60vh]">
        <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
        <p className="text-lg text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate("/recipes")}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
        >
          Back to Recipes
        </button>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center h-[60vh]">
        <p className="text-lg text-gray-700">Recipe not found.</p>
        <button
          onClick={() => navigate("/recipes")}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 mt-4"
        >
          Back to Recipes
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-emerald-600 mb-6 hover:text-emerald-700"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        <span>Back to recipes</span>
      </button>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor()}`}
            >
              {recipe.difficulty.charAt(0).toUpperCase() +
                recipe.difficulty.slice(1)}
            </span>
            <span className="ml-2 text-gray-500 capitalize">
              {recipe.category}
            </span>
          </div>
          <button
            onClick={toggleFavorite}
            className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100"
          >
            <Heart
              className={`h-6 w-6 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </button>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {recipe.title}
        </h1>
        <p className="text-gray-600 mb-6">{recipe.description}</p>

        <div className="flex items-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{calculateTotalTime()} min</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden h-72 bg-gray-100 mb-8">
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-400 text-lg font-medium">
              No Image Available
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b border-gray-100 pb-2"
              >
                <span className="text-gray-800">{ingredient.name}</span>
                <span className="text-gray-600">
                  {ingredient.amount} {ingredient.unit}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Preparation Time
            </h3>
            <p className="text-gray-600">{recipe.preparationTime} minutes</p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Cooking Time
            </h3>
            <p className="text-gray-600">{recipe.cookingTime} minutes</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Instructions</h2>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="ml-5">
                <div className="flex">
                  <span className="bg-emerald-100 text-emerald-800 font-semibold h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-gray-700">{instruction}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {recipe.notes && (
        <div className="mt-8 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Notes</h2>
          <p className="text-gray-700">{recipe.notes}</p>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
