import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import { AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const RecipeList = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      if (authLoading) {
        return;
      }
      console.log(user);
      if (!isAuthenticated || !user) {
        setLoading(false);
        setError("You must be logged in to view your recipes.");
        return;
      }

      setLoading(true);
      setError("");
      try {
        const response = await axios.get("http://localhost:3000/api/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.error(
          "Error fetching recipes:",
          err.response?.data?.message || err.message
        );
        setError(
          err.response?.data?.message ||
            "Failed to load recipes. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [isAuthenticated, user, authLoading]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[70vh] flex justify-center items-center">
        <p className="text-lg text-gray-700 flex items-center">
          <Loader2 className="animate-spin h-5 w-5 mr-3" /> Loading recipes...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[70vh] flex flex-col items-center justify-center">
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
        {!isAuthenticated && (
          <Link
            to="/login"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 mt-4"
          >
            Go to Login
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[70vh]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Recipes</h2>
        <p className="text-gray-600">
          Browse through your collection of recipes
        </p>
      </div>

      {recipes.length === 0 ? (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            No recipes yet
          </h3>
          <p className="text-gray-600 mb-4">
            Add your first recipe to get started.
          </p>
          <Link
            to="/add-recipe"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
          >
            Add Recipe
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <Link to={`/recipe/${recipe._id}`} key={recipe._id}>
              <RecipeCard recipe={recipe} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
