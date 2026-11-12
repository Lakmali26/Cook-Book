
import { useState } from "react";
import recipes from "./data/recipes";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [matchingRecipes, setMatchingRecipes] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [maxCookingTime, setMaxCookingTime] = useState("any");

  // Ingredients users can select
  const availableIngredients = [
    "Eggs",
    "Tomato",
    "Onion",
    "Potato",
    "Cheese",
    "Chicken"
  ];


  // Select or unselect an ingredient
  function selectIngredient(ingredient) {
    if (ingredients.includes(ingredient)) {
      setIngredients(
        ingredients.filter((item) => item !== ingredient)
      );
    } else {
      setIngredients([...ingredients, ingredient]);
    }

    setHasSearched(false);
  }

  // Find recipes based on ingredients and cooking time
  function findRecipes() {
    if (ingredients.length === 0) {
      alert("Please select at least one ingredient.");
      return;
    }

    const results = recipes
      .map((recipe) => {
        const matchedIngredients = recipe.ingredients.filter(
          (item) => ingredients.includes(item)
        );

        const missingIngredients = recipe.ingredients.filter(
          (item) => !ingredients.includes(item)
        );

        const matchPercentage = Math.round(
          (matchedIngredients.length / recipe.ingredients.length) * 100
        );

        return {
          ...recipe,
          matchedIngredients,
          missingIngredients,
          matchPercentage
        };
      })
      .filter((recipe) => {
        const hasMatchingIngredients =
          recipe.matchedIngredients.length > 0;

        const matchesCookingTime =
          maxCookingTime === "any" ||
          recipe.cookingTime <= Number(maxCookingTime);

        return hasMatchingIngredients && matchesCookingTime;
      })
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    setMatchingRecipes(results);
    setHasSearched(true);
  }

  // Add missing ingredients to shopping list
  function addToShoppingList(missingIngredients) {
    const newIngredients = missingIngredients.filter(
      (item) => !shoppingList.includes(item)
    );

    setShoppingList([...shoppingList, ...newIngredients]);

    alert("Missing ingredients added to your shopping list!");
  }

  // Remove an ingredient from shopping list
  function removeFromShoppingList(ingredient) {
    setShoppingList(
      shoppingList.filter((item) => item !== ingredient)
    );
  }

  return (
    <div className="min-h-screen bg-green-50">

      {/* Navigation bar */}
      <nav className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-700">
          Cook Book
        </h1>

        <div className="space-x-6 text-gray-600">
          <a href="#" className="hover:text-green-700">Home</a>
          <a href="#" className="hover:text-green-700">Recipes</a>
          <a href="#" className="hover:text-green-700">Shopping List</a>
        </div>
      </nav>

      {/* Welcome section */}
      <section className="text-center py-16 px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          What Can You Cook Today?
        </h2>

        <p className="text-gray-600 text-lg">
          Find delicious recipes using the ingredients you already have at home.
        </p>
      </section>

      {/* Ingredient selection */}
      <section className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 mx-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">
          Select Your Ingredients
        </h3>

        <p className="text-gray-500 mb-6">
          Choose the ingredients available in your kitchen.
        </p>

        <div className="flex flex-wrap gap-3">
          {availableIngredients.map((ingredient) => (
            <button
              key={ingredient}
              onClick={() => selectIngredient(ingredient)}
              className={`px-5 py-2 rounded-full border ${
                ingredients.includes(ingredient)
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-green-50"
              }`}
            >
              {ingredient}
            </button>
          ))}
        </div>

        <p className="mt-6 text-gray-600">
          Selected ingredients: {ingredients.length}
        </p>

        {/* Cooking time filter */}
        <div className="mt-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Maximum Cooking Time
          </label>

          <select
            value={maxCookingTime}
            onChange={(event) => setMaxCookingTime(event.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 bg-white"
          >
            <option value="any">Any cooking time</option>
            <option value="15">15 minutes or less</option>
            <option value="20">20 minutes or less</option>
            <option value="30">30 minutes or less</option>
          </select>
        </div>

        <button
          onClick={findRecipes}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
        >
          Find Recipes
        </button>
      </section>

      {/* Recipe matching results */}
      {hasSearched && (
        <section className="max-w-3xl mx-auto px-6 py-10">

          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Recipe Suggestions
          </h3>

          {matchingRecipes.length === 0 ? (
            <p className="text-gray-600">
              No matching recipes found. Try selecting different ingredients
              or choosing a longer cooking time.
            </p>
          ) : (
            <div className="space-y-5">
              {matchingRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xl font-semibold text-gray-800">
                      {recipe.name}
                    </h4>

                    <span className="text-green-700 font-bold">
                      {recipe.matchPercentage}% Match
                    </span>
                  </div>

                  <p className="text-gray-500 mb-4">
                    Cooking time: {recipe.cookingTime} minutes
                  </p>

                  {/* Match percentage bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-5">
                    <div
                      className="bg-green-600 h-3 rounded-full"
                      style={{ width: `${recipe.matchPercentage}%` }}
                    ></div>
                  </div>

                  <p className="text-gray-700 mb-2">
                    <strong>Available ingredients:</strong>{" "}
                    {recipe.matchedIngredients.join(", ")}
                  </p>

                  <p className="text-gray-700 mb-4">
                    <strong>Missing ingredients:</strong>{" "}
                    {recipe.missingIngredients.length === 0
                      ? "None"
                      : recipe.missingIngredients.join(", ")}
                  </p>

                  <button
                    onClick={() =>
                      addToShoppingList(recipe.missingIngredients)
                    }
                    disabled={recipe.missingIngredients.length === 0}
                    className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                  >
                    Add Missing Ingredients to Shopping List
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Shopping list */}
      <section className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 mx-6 mb-12">

        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          My Shopping List
        </h3>

        {shoppingList.length === 0 ? (
          <p className="text-gray-500">
            Your shopping list is empty.
          </p>
        ) : (
          <div className="space-y-3">
            {shoppingList.map((ingredient) => (
              <div
                key={ingredient}
                className="flex justify-between items-center border-b pb-3"
              >
                <span className="text-gray-700">
                  {ingredient}
                </span>

                <button
                  onClick={() => removeFromShoppingList(ingredient)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <p className="mt-5 text-gray-600">
          Total items: {shoppingList.length}
        </p>

      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500">
        <p>Cook Book - Find recipes with what you have!</p>
      </footer>

    </div>
  );
}

export default App;



