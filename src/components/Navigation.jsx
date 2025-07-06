import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiCamera, FiBook, FiCalendar, FiChef, FiSparkles } = FiIcons;

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/scanner', icon: FiCamera, label: 'Scanner' },
    { path: '/recipes', icon: FiBook, label: 'Recipes' },
    { path: '/planner', icon: FiCalendar, label: 'Planner' },
  ];

  return (
    <nav className="nav-container sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-3">
            <motion.div 
              className="icon-container icon-container-large floating"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiChef} className="w-8 h-8 neuro-icon-gradient" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gradient">PantryAI</span>
              <span className="text-xs text-neuro-muted font-medium">Smart Kitchen Assistant</span>
            </div>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className="relative">
                <motion.div
                  className={`neuro-button px-6 py-3 flex items-center space-x-3 ${
                    location.pathname === item.path ? 'neuro-card-inset' : ''
                  }`}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="icon-container icon-container-small">
                    <SafeIcon 
                      icon={item.icon} 
                      className={`w-5 h-5 ${
                        location.pathname === item.path ? 'neuro-icon-primary' : 'neuro-icon'
                      }`}
                    />
                  </div>
                  <span className={`hidden sm:block font-medium ${
                    location.pathname === item.path
                      ? 'text-neuro-primary'
                      : 'text-neuro-secondary'
                  }`}>
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            ))}
            
            {/* AI Assistant Button */}
            <motion.button
              className="neuro-button p-3 ml-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="icon-container icon-container-small">
                <SafeIcon icon={FiSparkles} className="w-5 h-5 neuro-icon-gradient" />
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;