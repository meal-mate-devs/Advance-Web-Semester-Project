import React from "react";
import { Clock, Users } from "lucide-react";
import { getDifficultyColor } from "../utils";

const RecipeCard = ({ recipe }) => {
  const calculateTotalTime = () => {
    const prepTime = parseInt(recipe.preparationTime) || 0;
    const cookTime = parseInt(recipe.cookingTime) || 0;
    return prepTime + cookTime;
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="w-full h-48 bg-gray-200 relative">
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <span className="text-gray-400 text-lg font-medium">No Image</span>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(
              recipe
            )}`}
          >
            {recipe.difficulty.charAt(0).toUpperCase() +
              recipe.difficulty.slice(1)}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className="inline-block capitalize">{recipe.category}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
          {recipe.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {recipe.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
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
    </div>
  );
};

export default RecipeCard;
