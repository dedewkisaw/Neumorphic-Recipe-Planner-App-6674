import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import PantryScanner from './pages/PantryScanner';
import RecipeGenerator from './pages/RecipeGenerator';
import MealPlanner from './pages/MealPlanner';
import Navigation from './components/Navigation';
import { PantryProvider } from './context/PantryContext';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  return (
    <PantryProvider>
      <Router>
        <div className="min-h-screen bg-neuro-bg">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={
                <div className="flex flex-col min-h-screen">
                  <Navigation />
                  <Dashboard />
                </div>
              } />
              <Route path="/scanner" element={
                <div className="flex flex-col min-h-screen">
                  <Navigation />
                  <PantryScanner />
                </div>
              } />
              <Route path="/recipes" element={
                <div className="flex flex-col min-h-screen">
                  <Navigation />
                  <RecipeGenerator />
                </div>
              } />
              <Route path="/planner" element={
                <div className="flex flex-col min-h-screen">
                  <Navigation />
                  <MealPlanner />
                </div>
              } />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </PantryProvider>
  );
}

export default App;