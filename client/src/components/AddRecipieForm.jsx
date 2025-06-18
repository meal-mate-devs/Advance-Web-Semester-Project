import React, { useState } from "react";
import { ChevronLeft, Clock, Plus, Minus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { categories, units } from "../utils";
import { useGlobalContext } from "../context/GlobalContext";

export default function AddRecipieForm() {
  const navigate = useNavigate();
  const { setRecipeList } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const [recipeForm, setRecipeForm] = useState({
    title: "",
    description: "",
    preparationTime: "",
    cookingTime: "",
    servings: 2,
    difficulty: "medium",
    category: "",
    ingredients: [{ name: "", amount: "", unit: "" }],
    instructions: [""],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeForm({
      ...recipeForm,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...recipeForm.ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value,
    };

    setRecipeForm({
      ...recipeForm,
      ingredients: updatedIngredients,
    });
  };

  const addIngredient = () => {
    setRecipeForm({
      ...recipeForm,
      ingredients: [
        ...recipeForm.ingredients,
        { name: "", amount: "", unit: "" },
      ],
    });
  };

  const removeIngredient = (index) => {
    if (recipeForm.ingredients.length <= 1) return;

    const updatedIngredients = [...recipeForm.ingredients];
    updatedIngredients.splice(index, 1);

    setRecipeForm({
      ...recipeForm,
      ingredients: updatedIngredients,
    });
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...recipeForm.instructions];
    updatedInstructions[index] = value;

    setRecipeForm({
      ...recipeForm,
      instructions: updatedInstructions,
    });
  };

  const addInstruction = () => {
    setRecipeForm({
      ...recipeForm,
      instructions: [...recipeForm.instructions, ""],
    });
  };

  const removeInstruction = (index) => {
    if (recipeForm.instructions.length <= 1) return;

    const updatedInstructions = [...recipeForm.instructions];
    updatedInstructions.splice(index, 1);

    setRecipeForm({
      ...recipeForm,
      instructions: updatedInstructions,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!recipeForm.title.trim()) newErrors.title = "Title is required";
    if (!recipeForm.description.trim())
      newErrors.description = "Description is required";
    if (!recipeForm.preparationTime.trim())
      newErrors.preparationTime = "Preparation time is required";
    if (!recipeForm.cookingTime.trim())
      newErrors.cookingTime = "Cooking time is required";
    if (!recipeForm.category) newErrors.category = "Category is required";

    const ingredientErrors = [];
    recipeForm.ingredients.forEach((ingredient, index) => {
      const error = {};
      if (!ingredient.name.trim()) error.name = "Required";
      if (!ingredient.amount.trim()) error.amount = "Required";

      if (Object.keys(error).length > 0) {
        ingredientErrors[index] = error;
      }
    });

    if (ingredientErrors.length > 0) {
      newErrors.ingredients = ingredientErrors;
    }

    const instructionErrors = [];
    recipeForm.instructions.forEach((instruction, index) => {
      if (!instruction.trim()) {
        instructionErrors[index] = "Instruction step cannot be empty";
      }
    });

    if (instructionErrors.length > 0) {
      newErrors.instructions = instructionErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = document.querySelector(".error-message");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setRecipeList((prev) => [...prev, { ...recipeForm, id: Date.now() }]);
      setRecipeForm({
        title: "",
        description: "",
        preparationTime: "",
        cookingTime: "",
        servings: 2,
        difficulty: "medium",
        category: "",
        ingredients: [{ name: "", amount: "", unit: "" }],
        instructions: [""],
      });
      setIsSubmitting(false);
      setFormSuccess(true);

      setTimeout(() => {
        navigate("/recipes");
      }, 2000);
    }, 1500);
  };

  return (
    <div className="bg-gray-50 pb-12">
      <div className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Link to="/" className="mr-4 text-gray-500 hover:text-emerald-500">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold text-gray-800">Add New Recipe</h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {formSuccess ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
              <svg
                className="w-8 h-8 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Recipe Added Successfully!
            </h2>
            <p className="text-gray-600 mb-4">
              Your new recipe has been added to your collection.
            </p>
            <p className="text-gray-500">Redirecting to your recipes...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Basic Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Recipe Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={recipeForm.title}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${
                      errors.title ? "border-red-300" : "border-gray-300"
                    } rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500`}
                    placeholder="E.g., Chocolate Chip Cookies"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600 error-message">
                      {errors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={recipeForm.description}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-3 py-2 border ${
                      errors.description ? "border-red-300" : "border-gray-300"
                    } rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500`}
                    placeholder="Brief description of your recipe"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600 error-message">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={recipeForm.category}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${
                      errors.category ? "border-red-300" : "border-gray-300"
                    } rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category.toLowerCase()}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600 error-message">
                      {errors.category}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="preparationTime"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Prep Time (minutes){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="number"
                        id="preparationTime"
                        name="preparationTime"
                        value={recipeForm.preparationTime}
                        onChange={handleChange}
                        min="0"
                        className={`w-full px-3 py-2 border ${
                          errors.preparationTime
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-md focus:ring-emerald-500 focus:border-emerald-500 pr-12`}
                        placeholder="15"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    {errors.preparationTime && (
                      <p className="mt-1 text-sm text-red-600 error-message">
                        {errors.preparationTime}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="cookingTime"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Cook Time (minutes){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="number"
                        id="cookingTime"
                        name="cookingTime"
                        value={recipeForm.cookingTime}
                        onChange={handleChange}
                        min="0"
                        className={`w-full px-3 py-2 border ${
                          errors.cookingTime
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-md focus:ring-emerald-500 focus:border-emerald-500 pr-12`}
                        placeholder="30"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    {errors.cookingTime && (
                      <p className="mt-1 text-sm text-red-600 error-message">
                        {errors.cookingTime}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="servings"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Servings
                    </label>
                    <input
                      type="number"
                      id="servings"
                      name="servings"
                      value={recipeForm.servings}
                      onChange={handleChange}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="4"
                    />
                  </div>
                </div>

                <div>
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-700 mb-1">
                      Difficulty Level
                    </legend>
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <input
                          id="easy"
                          name="difficulty"
                          type="radio"
                          value="easy"
                          checked={recipeForm.difficulty === "easy"}
                          onChange={handleChange}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                        />
                        <label
                          htmlFor="easy"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Easy
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="medium"
                          name="difficulty"
                          type="radio"
                          value="medium"
                          checked={recipeForm.difficulty === "medium"}
                          onChange={handleChange}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                        />
                        <label
                          htmlFor="medium"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Medium
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="hard"
                          name="difficulty"
                          type="radio"
                          value="hard"
                          checked={recipeForm.difficulty === "hard"}
                          onChange={handleChange}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                        />
                        <label
                          htmlFor="hard"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Hard
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Ingredients</h2>
                <button
                  type="button"
                  onClick={addIngredient}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Ingredient
                </button>
              </div>

              {recipeForm.ingredients.map((ingredient, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="sm:w-2/5">
                      <label
                        htmlFor={`ingredient-name-${index}`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Ingredient Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id={`ingredient-name-${index}`}
                        value={ingredient.name}
                        onChange={(e) =>
                          handleIngredientChange(index, "name", e.target.value)
                        }
                        className={`w-full px-3 py-2 border ${
                          errors.ingredients && errors.ingredients[index]?.name
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500`}
                        placeholder="E.g., Flour"
                      />
                      {errors.ingredients &&
                        errors.ingredients[index]?.name && (
                          <p className="mt-1 text-sm text-red-600 error-message">
                            {errors.ingredients[index].name}
                          </p>
                        )}
                    </div>

                    <div className="sm:w-1/5">
                      <label
                        htmlFor={`ingredient-amount-${index}`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Amount <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id={`ingredient-amount-${index}`}
                        value={ingredient.amount}
                        onChange={(e) =>
                          handleIngredientChange(
                            index,
                            "amount",
                            e.target.value
                          )
                        }
                        className={`w-full px-3 py-2 border ${
                          errors.ingredients &&
                          errors.ingredients[index]?.amount
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500`}
                        placeholder="E.g., 2"
                      />
                      {errors.ingredients &&
                        errors.ingredients[index]?.amount && (
                          <p className="mt-1 text-sm text-red-600 error-message">
                            {errors.ingredients[index].amount}
                          </p>
                        )}
                    </div>

                    <div className="sm:w-1/5">
                      <label
                        htmlFor={`ingredient-unit-${index}`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Unit
                      </label>
                      <select
                        id={`ingredient-unit-${index}`}
                        value={ingredient.unit}
                        onChange={(e) =>
                          handleIngredientChange(index, "unit", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="">Select unit</option>
                        {units.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-end sm:w-1/10 mb-1">
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeIngredient(index)}
                          className="px-2 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">
                  Instructions
                </h2>
                <button
                  type="button"
                  onClick={addInstruction}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Step
                </button>
              </div>

              {recipeForm.instructions.map((instruction, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex gap-3">
                    <div className="w-12 flex-shrink-0 flex items-start pt-2">
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                        {index + 1}
                      </span>
                    </div>

                    <div className="flex-grow">
                      <label
                        htmlFor={`instruction-${index}`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Step {index + 1} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id={`instruction-${index}`}
                        value={instruction}
                        onChange={(e) =>
                          handleInstructionChange(index, e.target.value)
                        }
                        rows={2}
                        className={`w-full px-3 py-2 border ${
                          errors.instructions && errors.instructions[index]
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500`}
                        placeholder={`E.g., Preheat the oven to 350°F (175°C)`}
                      />
                      {errors.instructions && errors.instructions[index] && (
                        <p className="mt-1 text-sm text-red-600 error-message">
                          {errors.instructions[index]}
                        </p>
                      )}
                    </div>

                    <div className="flex items-end pb-1">
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeInstruction(index)}
                          className="px-2 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-3">
              <Link
                to="/"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Saving..." : "Save Recipe"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
