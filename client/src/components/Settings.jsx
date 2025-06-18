import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";

export default function Settings() {
  const { recipeList, setRecipeList, favRecipes, setFavRecipes } =
    useGlobalContext();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [measurementUnit, setMeasurementUnit] = useState("metric");
  const [notifications, setNotifications] = useState(true);
  const [fontSize, setFontSize] = useState("medium");

  const clearAllRecipes = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all recipes? This action cannot be undone."
      )
    ) {
      setRecipeList([]);
    }
  };

  const clearFavorites = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all favorites? This action cannot be undone."
      )
    ) {
      setFavRecipes([]);
    }
  };

  const exportData = () => {
    const data = {
      recipes: recipeList,
      favorites: favRecipes,
      settings: {
        darkMode: isDarkMode,
        measurementUnit,
        notifications,
        fontSize,
      },
    };

    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mealmate-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-emerald-600">Settings</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Appearance</h2>

        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div>
            <p className="font-medium text-gray-800">Dark Mode</p>
            <p className="text-sm text-gray-500">
              Switch between light and dark theme
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-emerald-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div>
            <p className="font-medium text-gray-800">Font Size</p>
            <p className="text-sm text-gray-500">Adjust recipe text size</p>
          </div>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 p-2.5"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Preferences
        </h2>

        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div>
            <p className="font-medium text-gray-800">Measurement Units</p>
            <p className="text-sm text-gray-500">
              Choose your preferred measurement system
            </p>
          </div>
          <div className="flex gap-3">
            <button
              className={`px-3 py-1 rounded-md ${
                measurementUnit === "metric"
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setMeasurementUnit("metric")}
            >
              Metric
            </button>
            <button
              className={`px-3 py-1 rounded-md ${
                measurementUnit === "imperial"
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setMeasurementUnit("imperial")}
            >
              Imperial
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div>
            <p className="font-medium text-gray-800">Recipe Notifications</p>
            <p className="text-sm text-gray-500">
              Get notified about recipe updates
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-emerald-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Data Management
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={exportData}
            className="flex items-center justify-center gap-2 p-3 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Export Data
          </button>

          <button
            onClick={() => document.getElementById("import-file").click()}
            className="flex items-center justify-center gap-2 p-3 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
                transform="rotate(180 10 10)"
              />
            </svg>
            Import Data
            <input
              id="import-file"
              type="file"
              className="hidden"
              accept=".json"
            />
          </button>
        </div>

        <div className="border-t border-gray-100 mt-6 pt-6">
          <div className="flex flex-col gap-4">
            <button
              onClick={clearFavorites}
              className="flex items-center justify-center gap-2 p-3 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              Clear All Favorites
            </button>

            <button
              onClick={clearAllRecipes}
              className="flex items-center justify-center gap-2 p-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Clear All Recipes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
