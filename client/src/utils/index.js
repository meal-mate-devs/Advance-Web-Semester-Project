
export const categories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Appetizer",
    "Salad",
    "Soup",
    "Main Course",
    "Side Dish",
    "Baked Goods",
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Keto",
];

export const units = [
    "g",
    "kg",
    "oz",
    "lb",
    "cup",
    "tbsp",
    "tsp",
    "ml",
    "l",
    "piece",
    "pinch",
];

export const getDifficultyColor = (recipe) => {
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