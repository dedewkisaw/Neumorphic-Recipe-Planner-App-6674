import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { usePantry } from '../context/PantryContext';

const { FiCamera, FiBook, FiCalendar, FiPackage, FiTrendingUp, FiClock, FiStar, FiPlus, FiZap, FiHeart, FiTarget, FiAward } = FiIcons;

const Dashboard = () => {
  const { pantryItems, recipes, mealPlan } = usePantry();

  const stats = [
    {
      icon: FiPackage,
      label: "Pantry Items",
      value: pantryItems.length,
      change: "+12%",
      color: "primary"
    },
    {
      icon: FiBook,
      label: "Recipes Generated",
      value: recipes.length,
      change: "+8%",
      color: "success"
    },
    {
      icon: FiCalendar,
      label: "Meals Planned",
      value: Object.keys(mealPlan).length,
      change: "+15%",
      color: "warning"
    },
    {
      icon: FiTrendingUp,
      label: "Waste Reduced",
      value: "42%",
      change: "+5%",
      color: "error"
    }
  ];

  const quickActions = [
    {
      icon: FiCamera,
      title: "Smart Scan",
      description: "AI-powered pantry scanning",
      link: "/scanner"
    },
    {
      icon: FiBook,
      title: "Generate Recipes",
      description: "Create magical recipes",
      link: "/recipes"
    },
    {
      icon: FiCalendar,
      title: "Plan Meals",
      description: "Organize your culinary journey",
      link: "/planner"
    }
  ];

  const recentRecipes = recipes.slice(-3);

  return (
    <div className="min-h-screen bg-neuro p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-neuro-primary mb-2">
                Welcome back, <span className="text-gradient">Chef</span>!
              </h1>
              <p className="text-lg text-neuro-secondary">
                Ready to create something extraordinary today?
              </p>
            </div>
            <motion.div className="floating">
              <div className="icon-container icon-container-large">
                <SafeIcon icon={FiZap} className="w-10 h-10 neuro-icon-gradient" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="stats-card p-6 text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="icon-container icon-container-large">
                  <SafeIcon icon={stat.icon} className={`w-8 h-8 neuro-icon-${stat.color}`} />
                </div>
              </div>
              <div className="relative">
                <h3 className="text-2xl font-bold text-neuro-primary mb-1">{stat.value}</h3>
                <p className="text-neuro-secondary font-medium text-sm">{stat.label}</p>
                <div className="absolute -top-2 -right-2 bg-neuro-surface px-2 py-1 rounded-full text-xs font-semibold text-neuro-primary shadow-neuro">
                  {stat.change}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-neuro-primary">Quick Actions</h2>
            <div className="icon-container">
              <SafeIcon icon={FiTarget} className="w-6 h-6 neuro-icon-gradient" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link}>
                <motion.div
                  className="neuro-card-elevated p-8 text-center group"
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex justify-center mb-6">
                    <div className="icon-container icon-container-large">
                      <SafeIcon icon={action.icon} className="w-8 h-8 neuro-icon-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-neuro-primary mb-3">{action.title}</h3>
                  <p className="text-neuro-secondary">{action.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Recipes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="neuro-card-elevated p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="icon-container">
                  <SafeIcon icon={FiBook} className="w-6 h-6 neuro-icon-warning" />
                </div>
                <h2 className="text-xl font-bold text-neuro-primary">Recent Recipes</h2>
              </div>
              <Link to="/recipes">
                <motion.button
                  className="neuro-button p-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SafeIcon icon={FiPlus} className="w-5 h-5 neuro-icon-gradient" />
                </motion.button>
              </Link>
            </div>

            {recentRecipes.length > 0 ? (
              <div className="space-y-4">
                {recentRecipes.map((recipe, index) => (
                  <motion.div
                    key={recipe.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="meal-card p-4 flex items-center space-x-4"
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-14 h-14 object-cover recipe-card-image"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-neuro-primary mb-1">{recipe.title}</h3>
                      <div className="flex items-center space-x-3 text-sm text-neuro-secondary">
                        <span className="flex items-center">
                          <SafeIcon icon={FiClock} className="w-4 h-4 mr-1 neuro-icon" />
                          {recipe.cookTime}
                        </span>
                        <span className="flex items-center">
                          <SafeIcon icon={FiStar} className="w-4 h-4 mr-1 neuro-icon-warning" />
                          {recipe.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className="icon-container icon-container-small">
                      <SafeIcon icon={FiHeart} className="w-4 h-4 neuro-icon-error" />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-neuro-muted">
                <div className="icon-container icon-container-large mx-auto mb-4">
                  <SafeIcon icon={FiBook} className="w-8 h-8 neuro-icon" />
                </div>
                <p className="text-lg font-medium">No recipes yet</p>
                <p className="text-sm">Start by scanning your pantry!</p>
              </div>
            )}
          </motion.div>

          {/* Pantry Overview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="neuro-card-elevated p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="icon-container">
                  <SafeIcon icon={FiPackage} className="w-6 h-6 neuro-icon-success" />
                </div>
                <h2 className="text-xl font-bold text-neuro-primary">Pantry Overview</h2>
              </div>
              <Link to="/scanner">
                <motion.button
                  className="neuro-button p-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SafeIcon icon={FiCamera} className="w-5 h-5 neuro-icon-gradient" />
                </motion.button>
              </Link>
            </div>

            {pantryItems.length > 0 ? (
              <div className="space-y-3">
                {pantryItems.slice(0, 5).map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 neuro-card-inset"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-neuro-surface rounded-full shadow-neuro"></div>
                      <span className="font-medium text-neuro-primary">{item.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-neuro-secondary">{item.quantity || 1}</span>
                      <div className="icon-container icon-container-small">
                        <SafeIcon icon={FiAward} className="w-3 h-3 neuro-icon-success" />
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {pantryItems.length > 5 && (
                  <p className="text-sm text-neuro-muted text-center mt-4">
                    +{pantryItems.length - 5} more items in your pantry
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-neuro-muted">
                <div className="icon-container icon-container-large mx-auto mb-4">
                  <SafeIcon icon={FiPackage} className="w-8 h-8 neuro-icon" />
                </div>
                <p className="text-lg font-medium">Your pantry is empty</p>
                <p className="text-sm">Start scanning items to get started!</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;