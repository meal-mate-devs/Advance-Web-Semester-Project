import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  Upload,
  BookOpen,
  Loader2,
  AlertCircle,
  CheckCircle,
  ChevronLeft,
} from "lucide-react";

export default function UploadCourse() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedRecipeIds, setSelectedRecipeIds] = useState([]);
  const [availableRecipes, setAvailableRecipes] = useState([]);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [recipesLoading, setRecipesLoading] = useState(true);
  const [recipesError, setRecipesError] = useState("");

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (user && user.role !== "chef") {
      setError("You must be a registered chef to upload courses.");
      setTimeout(() => navigate("/profile"), 2000);
    }
  }, [isAuthenticated, authLoading, user, navigate]);

  useEffect(() => {
    const fetchAvailableRecipes = async () => {
      if (!isAuthenticated || !user || !user._id || user.role !== "chef") {
        setRecipesLoading(false);
        return;
      }
      setRecipesLoading(true);
      setRecipesError("");
      try {
        const response = await axios.get("http://localhost:3000/api/recipes");
        setAvailableRecipes(response.data);
      } catch (err) {
        setRecipesError("Failed to fetch your recipes. Please try again.");
        console.error(
          "Error fetching available recipes:",
          err.response?.data?.message || err.message
        );
      } finally {
        setRecipesLoading(false);
      }
    };

    fetchAvailableRecipes();
  }, [isAuthenticated, user]);

  const handleRecipeSelection = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedRecipeIds((prev) => [...prev, value]);
    } else {
      setSelectedRecipeIds((prev) => prev.filter((id) => id !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!isAuthenticated || !user || user.role !== "chef") {
      setError("You must be a registered chef to upload courses.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/courses", {
        title,
        description,
        recipeIds: selectedRecipeIds,
        coverImageUrl,
      });

      setSuccess(response.data.message);
      setTimeout(() => {
        navigate("/courses");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload course.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || (isAuthenticated && user && user.role !== "chef")) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-gray-700">
          {user?.role !== "chef" ? "Redirecting, not a chef..." : "Loading..."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
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
              Upload New Course
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-6">
            <Upload className="h-6 w-6 text-emerald-500 mr-2" />
            <h2 className="text-lg font-bold text-gray-800">Course Details</h2>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <p>{success}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="e.g., Mastering Italian Pasta"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="A brief overview of what this course covers..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="coverImageUrl"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Cover Image URL (Optional)
              </label>
              <input
                id="coverImageUrl"
                name="coverImageUrl"
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Link to an image for your course"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Recipes for this Course
              </label>
              {recipesLoading ? (
                <p className="text-gray-600 flex items-center">
                  <Loader2 className="animate-spin h-4 w-4 mr-2" /> Loading your
                  recipes...
                </p>
              ) : recipesError ? (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p>{recipesError}</p>
                </div>
              ) : availableRecipes.length === 0 ? (
                <div className="bg-gray-50 rounded-md p-4 text-center">
                  <p className="text-gray-600 mb-2">
                    You don't have any recipes yet to add to a course.
                  </p>
                  <Link
                    to="/add-recipe"
                    className="text-emerald-600 hover:underline flex items-center justify-center"
                  >
                    <BookOpen className="h-4 w-4 mr-1" /> Add your first recipe
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto border border-gray-200 p-3 rounded-md">
                  {availableRecipes &&
                    availableRecipes.map((recipe) => (
                      <label
                        key={recipe._id}
                        className="flex items-center space-x-2 bg-gray-50 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={recipe._id}
                          checked={selectedRecipeIds.includes(recipe._id)}
                          onChange={handleRecipeSelection}
                          className="form-checkbox h-4 w-4 text-emerald-600 rounded"
                        />
                        <span className="text-gray-800 text-sm">
                          {recipe.title}
                        </span>
                      </label>
                    ))}
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 flex items-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Course
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
