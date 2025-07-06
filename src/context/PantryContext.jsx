import React, { createContext, useContext, useState, useEffect } from 'react';

const PantryContext = createContext();

export const usePantry = () => {
  const context = useContext(PantryContext);
  if (!context) {
    throw new Error('usePantry must be used within a PantryProvider');
  }
  return context;
};

export const PantryProvider = ({ children }) => {
  const [pantryItems, setPantryItems] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [mealPlan, setMealPlan] = useState({});
  const [loading, setLoading] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedPantryItems = localStorage.getItem('pantryItems');
    const savedRecipes = localStorage.getItem('recipes');
    const savedMealPlan = localStorage.getItem('mealPlan');

    if (savedPantryItems) {
      setPantryItems(JSON.parse(savedPantryItems));
    }
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    }
    if (savedMealPlan) {
      setMealPlan(JSON.parse(savedMealPlan));
    }
  }, []);

  // Save pantry items to localStorage
  useEffect(() => {
    localStorage.setItem('pantryItems', JSON.stringify(pantryItems));
  }, [pantryItems]);

  // Save recipes to localStorage
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  // Save meal plan to localStorage
  useEffect(() => {
    localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
  }, [mealPlan]);

  const addPantryItem = (item) => {
    const newItem = {
      id: Date.now(),
      ...item,
      dateAdded: new Date().toISOString(),
    };
    setPantryItems(prev => [...prev, newItem]);
  };

  const removePantryItem = (id) => {
    setPantryItems(prev => prev.filter(item => item.id !== id));
  };

  const updatePantryItem = (id, updates) => {
    setPantryItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const addRecipe = (recipe) => {
    const newRecipe = {
      id: Date.now(),
      ...recipe,
      dateCreated: new Date().toISOString(),
    };
    setRecipes(prev => [...prev, newRecipe]);
  };

  const removeRecipe = (id) => {
    setRecipes(prev => prev.filter(recipe => recipe.id !== id));
  };

  const addToMealPlan = (date, meal, recipe) => {
    setMealPlan(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        [meal]: recipe
      }
    }));
  };

  const removeFromMealPlan = (date, meal) => {
    setMealPlan(prev => {
      const newPlan = { ...prev };
      if (newPlan[date]) {
        delete newPlan[date][meal];
        if (Object.keys(newPlan[date]).length === 0) {
          delete newPlan[date];
        }
      }
      return newPlan;
    });
  };

  const generateRecipes = async (selectedIngredients) => {
    setLoading(true);
    try {
      // Simulate AI recipe generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockRecipes = [
        {
          id: Date.now() + 1,
          title: "Mediterranean Veggie Bowl",
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
          cookTime: "25 mins",
          difficulty: "Easy",
          servings: 4,
          ingredients: selectedIngredients.slice(0, 6),
          instructions: [
            "Preheat oven to 400°F",
            "Chop vegetables into bite-sized pieces",
            "Toss with olive oil and seasonings",
            "Roast for 20 minutes until tender",
            "Serve over quinoa with tahini dressing"
          ],
          nutrition: {
            calories: 320,
            protein: 12,
            carbs: 45,
            fat: 14
          }
        },
        {
          id: Date.now() + 2,
          title: "Spicy Stir-Fry Delight",
          image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
          cookTime: "15 mins",
          difficulty: "Medium",
          servings: 3,
          ingredients: selectedIngredients.slice(2, 8),
          instructions: [
            "Heat oil in wok over high heat",
            "Add aromatics and cook for 30 seconds",
            "Add vegetables in order of cooking time",
            "Stir-fry until crisp-tender",
            "Add sauce and toss to combine"
          ],
          nutrition: {
            calories: 280,
            protein: 18,
            carbs: 32,
            fat: 10
          }
        },
        {
          id: Date.now() + 3,
          title: "Hearty Comfort Soup",
          image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop",
          cookTime: "35 mins",
          difficulty: "Easy",
          servings: 6,
          ingredients: selectedIngredients.slice(1, 7),
          instructions: [
            "Sauté onions until translucent",
            "Add vegetables and cook until softened",
            "Add broth and bring to boil",
            "Simmer for 20 minutes",
            "Season to taste and serve hot"
          ],
          nutrition: {
            calories: 195,
            protein: 8,
            carbs: 28,
            fat: 6
          }
        }
      ];

      setRecipes(prev => [...prev, ...mockRecipes]);
      return mockRecipes;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    pantryItems,
    recipes,
    mealPlan,
    loading,
    addPantryItem,
    removePantryItem,
    updatePantryItem,
    addRecipe,
    removeRecipe,
    addToMealPlan,
    removeFromMealPlan,
    generateRecipes,
  };

  return (
    <PantryContext.Provider value={value}>
      {children}
    </PantryContext.Provider>
  );
};