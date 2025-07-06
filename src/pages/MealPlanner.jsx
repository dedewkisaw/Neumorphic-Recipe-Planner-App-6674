import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { usePantry } from '../context/PantryContext';

const { FiCalendar, FiPlus, FiX, FiClock, FiUsers, FiChevronLeft, FiChevronRight, FiEdit3, FiTrash2 } = FiIcons;

const MealPlanner = () => {
  const { recipes, mealPlan, addToMealPlan, removeFromMealPlan } = usePantry();
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
  const mealTypeLabels = {
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    snack: 'Snack'
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));

  const getMealForDate = (date, mealType) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return mealPlan[dateKey]?.[mealType];
  };

  const handleAddMeal = (date, mealType) => {
    setSelectedDate(date);
    setSelectedMealType(mealType);
    setShowAddMeal(true);
  };

  const handleSelectRecipe = (recipe) => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    addToMealPlan(dateKey, selectedMealType, recipe);
    setShowAddMeal(false);
    setSelectedRecipe(null);
  };

  const handleRemoveMeal = (date, mealType) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    removeFromMealPlan(dateKey, mealType);
  };

  const navigateWeek = (direction) => {
    setCurrentWeek(prev => addDays(prev, direction * 7));
  };

  const getMealTypeColor = (mealType) => {
    switch (mealType) {
      case 'breakfast': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'lunch': return 'bg-green-100 text-green-800 border-green-200';
      case 'dinner': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'snack': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
            Meal <span className="gradient-text">Planner</span>
          </h1>
          <p className="text-xl text-gray-600">
            Plan your weekly meals with beautiful organization
          </p>
        </motion.div>

        {/* Week Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="neuro-card p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => navigateWeek(-1)}
              className="neuro-button p-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiChevronLeft} className="w-6 h-6 text-gray-600" />
            </motion.button>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {format(currentWeek, 'MMMM d')} - {format(addDays(currentWeek, 6), 'MMMM d, yyyy')}
              </h2>
              <p className="text-gray-600">Weekly Meal Plan</p>
            </div>

            <motion.button
              onClick={() => navigateWeek(1)}
              className="neuro-button p-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiChevronRight} className="w-6 h-6 text-gray-600" />
            </motion.button>
          </div>
        </motion.div>

        {/* Calendar Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-8"
        >
          {weekDays.map((day, index) => (
            <div key={index} className="neuro-card p-4">
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  {format(day, 'EEE')}
                </h3>
                <p className={`text-2xl font-bold ${
                  isSameDay(day, new Date()) ? 'text-neuro-accent' : 'text-gray-600'
                }`}>
                  {format(day, 'd')}
                </p>
              </div>

              <div className="space-y-3">
                {mealTypes.map((mealType) => {
                  const meal = getMealForDate(day, mealType);
                  return (
                    <div key={mealType} className="relative">
                      <div className={`text-xs font-medium mb-1 px-2 py-1 rounded ${getMealTypeColor(mealType)}`}>
                        {mealTypeLabels[mealType]}
                      </div>
                      
                      {meal ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="meal-card p-3 group relative"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-gray-800 truncate">
                                {meal.title}
                              </h4>
                              <div className="flex items-center space-x-2 text-xs text-gray-600 mt-1">
                                <span className="flex items-center">
                                  <SafeIcon icon={FiClock} className="w-3 h-3 mr-1" />
                                  {meal.cookTime}
                                </span>
                                <span className="flex items-center">
                                  <SafeIcon icon={FiUsers} className="w-3 h-3 mr-1" />
                                  {meal.servings}
                                </span>
                              </div>
                            </div>
                            <motion.button
                              onClick={() => handleRemoveMeal(day, mealType)}
                              className="opacity-0 group-hover:opacity-100 neuro-button p-1 text-red-500 transition-opacity"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <SafeIcon icon={FiX} className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.button
                          onClick={() => handleAddMeal(day, mealType)}
                          className="w-full neuro-button p-3 text-gray-400 hover:text-neuro-accent transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <SafeIcon icon={FiPlus} className="w-5 h-5 mx-auto" />
                        </motion.button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Weekly Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="neuro-card p-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Weekly Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {mealTypes.map((mealType) => {
              const mealsCount = weekDays.reduce((count, day) => {
                return count + (getMealForDate(day, mealType) ? 1 : 0);
              }, 0);

              return (
                <div key={mealType} className="text-center">
                  <div className={`neuro-card p-4 mb-3 ${getMealTypeColor(mealType)}`}>
                    <div className="text-2xl font-bold">{mealsCount}</div>
                    <div className="text-sm font-medium">{mealTypeLabels[mealType]}s</div>
                  </div>
                  <div className="text-xs text-gray-600">
                    {7 - mealsCount} remaining
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Add Meal Modal */}
        <AnimatePresence>
          {showAddMeal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowAddMeal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="neuro-card max-w-4xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Add {mealTypeLabels[selectedMealType]} for {format(selectedDate, 'MMMM d')}
                    </h2>
                    <motion.button
                      onClick={() => setShowAddMeal(false)}
                      className="neuro-button p-2 text-gray-600"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <SafeIcon icon={FiX} className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {recipes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {recipes.map((recipe) => (
                        <motion.div
                          key={recipe.id}
                          className="recipe-card cursor-pointer"
                          onClick={() => handleSelectRecipe(recipe)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-32 object-cover rounded-t-lg"
                          />
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-800 mb-2">{recipe.title}</h3>
                            <div className="flex items-center space-x-3 text-sm text-gray-600">
                              <span className="flex items-center">
                                <SafeIcon icon={FiClock} className="w-4 h-4 mr-1" />
                                {recipe.cookTime}
                              </span>
                              <span className="flex items-center">
                                <SafeIcon icon={FiUsers} className="w-4 h-4 mr-1" />
                                {recipe.servings}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <SafeIcon icon={FiCalendar} className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">No recipes available</p>
                      <p>Generate some recipes first to add them to your meal plan!</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MealPlanner;