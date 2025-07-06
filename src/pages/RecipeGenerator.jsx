import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { usePantry } from '../context/PantryContext';

const { FiChef, FiClock, FiUsers, FiStar, FiHeart, FiBookmark, FiArrowRight, FiRefreshCw, FiX, FiCalendar } = FiIcons;

const RecipeGenerator = () => {
  const { pantryItems, recipes, generateRecipes, loading } = usePantry();
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [generatedRecipes, setGeneratedRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [dietaryPreferences, setDietaryPreferences] = useState([]);
  const [cuisineType, setCuisineType] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Low-Carb', 'High-Protein'
  ];

  const cuisineOptions = [
    'Italian', 'Mexican', 'Asian', 'Mediterranean', 'American', 'Indian', 'French', 'Thai'
  ];

  const difficultyOptions = [
    'Easy', 'Medium', 'Hard'
  ];

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient)
        ? prev.filter(item => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  const toggleDietaryPreference = (preference) => {
    setDietaryPreferences(prev => 
      prev.includes(preference)
        ? prev.filter(item => item !== preference)
        : [...prev, preference]
    );
  };

  const handleGenerateRecipes = async () => {
    if (selectedIngredients.length === 0) return;
    
    const newRecipes = await generateRecipes(selectedIngredients);
    setGeneratedRecipes(newRecipes);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-500';
      case 'Medium': return 'text-yellow-500';
      case 'Hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="flex-1 bg-neuro-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Recipe <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-xl text-gray-600">
            Create delicious recipes from your pantry ingredients
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Recipe Configuration */}
          <div className="lg:col-span-1 space-y-6">
            {/* Ingredient Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="neuro-card p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">Select Ingredients</h2>
              
              {pantryItems.length > 0 ? (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {pantryItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className={`ingredient-tag px-3 py-2 cursor-pointer transition-all duration-200 ${
                        selectedIngredients.includes(item.name)
                          ? 'shadow-neuro-pressed bg-neuro-accent'
                          : 'hover:shadow-neuro-hover'
                      }`}
                      onClick={() => toggleIngredient(item.name)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.name}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No pantry items available</p>
                  <p className="text-sm">Add items to your pantry first!</p>
                </div>
              )}
            </motion.div>

            {/* Dietary Preferences */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="neuro-card p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">Dietary Preferences</h2>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map((option) => (
                  <motion.button
                    key={option}
                    onClick={() => toggleDietaryPreference(option)}
                    className={`ingredient-tag px-3 py-1 text-sm cursor-pointer transition-all duration-200 ${
                      dietaryPreferences.includes(option)
                        ? 'shadow-neuro-pressed bg-neuro-success'
                        : 'bg-gray-200 hover:shadow-neuro-hover'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Cuisine & Difficulty */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="neuro-card p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">Preferences</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine Type</label>
                  <select
                    value={cuisineType}
                    onChange={(e) => setCuisineType(e.target.value)}
                    className="neuro-input w-full p-3 text-gray-800"
                  >
                    <option value="">Any Cuisine</option>
                    {cuisineOptions.map(cuisine => (
                      <option key={cuisine} value={cuisine}>{cuisine}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="neuro-input w-full p-3 text-gray-800"
                  >
                    <option value="">Any Difficulty</option>
                    {difficultyOptions.map(diff => (
                      <option key={diff} value={diff}>{diff}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Generate Button */}
            <motion.button
              onClick={handleGenerateRecipes}
              disabled={selectedIngredients.length === 0 || loading}
              className="neuro-button w-full py-4 text-lg font-semibold text-white bg-gradient-to-r from-neuro-accent to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: selectedIngredients.length > 0 && !loading ? 1.02 : 1 }}
              whileTap={{ scale: selectedIngredients.length > 0 && !loading ? 0.98 : 1 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Generating Recipes...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <SafeIcon icon={FiChef} className="w-6 h-6 mr-2" />
                  Generate Recipes ({selectedIngredients.length} ingredients)
                </div>
              )}
            </motion.button>
          </div>

          {/* Right Column - Generated Recipes */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {generatedRecipes.length > 0 ? (
                <motion.div
                  key="recipes"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">Generated Recipes</h2>
                    <motion.button
                      onClick={handleGenerateRecipes}
                      className="neuro-button p-2 text-neuro-accent"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <SafeIcon icon={FiRefreshCw} className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {generatedRecipes.map((recipe, index) => (
                      <motion.div
                        key={recipe.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="recipe-card cursor-pointer"
                        onClick={() => setSelectedRecipe(recipe)}
                      >
                        <div className="relative">
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <div className="absolute top-4 right-4">
                            <motion.button
                              className="neuro-button p-2 bg-white/90 text-neuro-accent"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <SafeIcon icon={FiHeart} className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.title}</h3>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                            <span className="flex items-center">
                              <SafeIcon icon={FiClock} className="w-4 h-4 mr-1" />
                              {recipe.cookTime}
                            </span>
                            <span className="flex items-center">
                              <SafeIcon icon={FiUsers} className="w-4 h-4 mr-1" />
                              {recipe.servings} servings
                            </span>
                            <span className={`flex items-center ${getDifficultyColor(recipe.difficulty)}`}>
                              <SafeIcon icon={FiStar} className="w-4 h-4 mr-1" />
                              {recipe.difficulty}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-neuro-bg text-xs rounded-full text-gray-600"
                              >
                                {ingredient}
                              </span>
                            ))}
                            {recipe.ingredients.length > 3 && (
                              <span className="px-2 py-1 bg-neuro-bg text-xs rounded-full text-gray-600">
                                +{recipe.ingredients.length - 3} more
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                              {recipe.nutrition.calories} calories
                            </div>
                            <div className="flex items-center text-neuro-accent">
                              <span className="text-sm font-medium mr-1">View Recipe</span>
                              <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="neuro-card p-12 text-center"
                >
                  <SafeIcon icon={FiChef} className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Ready to Create?</h3>
                  <p className="text-gray-600 mb-6">
                    Select ingredients from your pantry and let our AI chef create amazing recipes for you!
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    {[
                      { icon: FiChef, text: "AI-Powered Recipes" },
                      { icon: FiClock, text: "Quick & Easy" },
                      { icon: FiHeart, text: "Personalized" }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center justify-center space-x-2 text-gray-600">
                        <SafeIcon icon={feature.icon} className="w-5 h-5" />
                        <span className="text-sm">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Recipe Detail Modal */}
        <AnimatePresence>
          {selectedRecipe && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedRecipe(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="neuro-card max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <img
                    src={selectedRecipe.image}
                    alt={selectedRecipe.title}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <motion.button
                    onClick={() => setSelectedRecipe(null)}
                    className="absolute top-4 right-4 neuro-button p-2 bg-white/90 text-gray-600"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <SafeIcon icon={FiX} className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedRecipe.title}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Ingredients</h3>
                      <ul className="space-y-2">
                        {selectedRecipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-neuro-accent rounded-full"></div>
                            <span className="text-gray-700">{ingredient}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Nutrition Facts</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <span>Calories: {selectedRecipe.nutrition.calories}</span>
                          <span>Protein: {selectedRecipe.nutrition.protein}g</span>
                          <span>Carbs: {selectedRecipe.nutrition.carbs}g</span>
                          <span>Fat: {selectedRecipe.nutrition.fat}g</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Instructions</h3>
                      <ol className="space-y-3">
                        {selectedRecipe.instructions.map((step, index) => (
                          <li key={index} className="flex space-x-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-neuro-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </span>
                            <span className="text-gray-700">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <motion.button
                      className="neuro-button px-6 py-3 text-white bg-gradient-to-r from-neuro-accent to-pink-500 font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <SafeIcon icon={FiBookmark} className="w-5 h-5 mr-2" />
                      Save Recipe
                    </motion.button>
                    <motion.button
                      className="neuro-button px-6 py-3 text-gray-700 font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <SafeIcon icon={FiCalendar} className="w-5 h-5 mr-2" />
                      Add to Meal Plan
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecipeGenerator;