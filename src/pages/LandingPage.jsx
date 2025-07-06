import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCamera, FiBook, FiCalendar, FiChef, FiStar, FiTrendingUp, FiClock, FiHeart, FiZap, FiSparkles, FiTarget, FiAward, FiShield } = FiIcons;

const LandingPage = () => {
  const features = [
    {
      icon: FiCamera,
      title: "AI-Powered Scanner",
      description: "Instantly recognize and catalog your pantry items with cutting-edge computer vision"
    },
    {
      icon: FiBook,
      title: "Smart Recipe Generation",
      description: "Get personalized, gourmet recipes crafted by AI based on your available ingredients"
    },
    {
      icon: FiCalendar,
      title: "Intelligent Meal Planning",
      description: "Plan your weekly meals with beautiful, intuitive calendar interface and smart suggestions"
    },
    {
      icon: FiTrendingUp,
      title: "Waste Reduction Analytics",
      description: "Track and minimize food waste with intelligent expiration monitoring and insights"
    }
  ];

  const painPoints = [
    {
      emoji: "😤",
      text: "Tired of staring at your pantry wondering what to cook?"
    },
    {
      emoji: "🗑️",
      text: "Frustrated by food waste and expired ingredients?"
    },
    {
      emoji: "🤯",
      text: "Overwhelmed by meal planning and grocery shopping?"
    },
    {
      emoji: "🍽️",
      text: "Want to eat healthier but lack recipe inspiration?"
    }
  ];

  const benefits = [
    {
      icon: FiClock,
      text: "Save 3+ hours per week on meal planning"
    },
    {
      icon: FiTrendingUp,
      text: "Reduce food waste by up to 40%"
    },
    {
      icon: FiSparkles,
      text: "Discover new recipes using ingredients you already have"
    },
    {
      icon: FiTarget,
      text: "Never run out of meal ideas again"
    }
  ];

  return (
    <div className="min-h-screen bg-neuro">
      {/* Header */}
      <header className="hero-section relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-12"
            >
              <div className="inline-flex items-center space-x-4 mb-8">
                <motion.div 
                  className="icon-container icon-container-large floating"
                  whileHover={{ scale: 1.05 }}
                >
                  <SafeIcon icon={FiChef} className="w-12 h-12 neuro-icon-gradient" />
                </motion.div>
                <div>
                  <h1 className="text-5xl md:text-7xl font-bold text-neuro-primary mb-2">
                    PantryAI
                  </h1>
                  <p className="text-lg text-neuro-secondary">Smart Kitchen Assistant</p>
                </div>
              </div>
              
              <p className="text-xl md:text-2xl text-neuro-secondary max-w-3xl mx-auto leading-relaxed">
                Transform your pantry into a <span className="text-gradient font-bold">gourmet kitchen</span> with 
                AI-powered recipe generation and intelligent meal planning
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/dashboard">
                <motion.button
                  className="neuro-button-primary px-10 py-4 text-lg font-semibold"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiZap} className="w-5 h-5" />
                    <span>Start Cooking Smart</span>
                  </div>
                </motion.button>
              </Link>
              
              <motion.button
                className="neuro-button px-10 py-4 text-lg font-semibold"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiStar} className="w-5 h-5 neuro-icon-warning" />
                  <span>Watch Demo</span>
                </div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Pain Points Section */}
      <section className="py-20 bg-neuro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neuro-primary mb-6">
              We Feel Your <span className="text-gradient">Kitchen Frustration</span>
            </h2>
            <p className="text-xl text-neuro-secondary max-w-3xl mx-auto">
              Every day, millions of people face the same cooking challenges. You're not alone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {painPoints.map((pain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="neuro-card-elevated p-8 text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-neuro-surface rounded-full flex items-center justify-center text-4xl shadow-neuro">
                  {pain.emoji}
                </div>
                <p className="text-lg text-neuro-primary font-medium">{pain.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h3 className="text-3xl font-bold text-neuro-primary mb-8">
              What if there was a <span className="text-gradient">better way</span>?
            </h3>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neuro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neuro-primary mb-6">
              Your <span className="text-gradient">Smart Kitchen</span> Assistant
            </h2>
            <p className="text-xl text-neuro-secondary max-w-3xl mx-auto">
              Powered by cutting-edge AI technology to revolutionize your cooking experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="neuro-card-elevated p-8 text-center"
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <div className="flex justify-center mb-6">
                  <div className="icon-container icon-container-large">
                    <SafeIcon icon={feature.icon} className="w-8 h-8 neuro-icon-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-neuro-primary mb-4">{feature.title}</h3>
                <p className="text-neuro-secondary">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-neuro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neuro-primary mb-6">
              Transform Your <span className="text-gradient">Kitchen Life</span>
            </h2>
            <p className="text-xl text-neuro-secondary max-w-3xl mx-auto">
              Join thousands of home cooks who've revolutionized their cooking experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="neuro-card-elevated p-8 flex items-center space-x-6"
              >
                <div className="icon-container icon-container-large flex-shrink-0">
                  <SafeIcon icon={benefit.icon} className="w-8 h-8 neuro-icon-success" />
                </div>
                <p className="text-lg text-neuro-primary font-medium">{benefit.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="neuro-card-elevated p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-neuro-primary mb-8">
                Ready to Cook Smarter?
              </h3>
              <p className="text-xl text-neuro-secondary mb-10">
                Join the cooking revolution and never wonder "what's for dinner?" again
              </p>
              <Link to="/dashboard">
                <motion.button
                  className="neuro-button-primary px-12 py-5 text-xl font-bold"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiSparkles} className="w-6 h-6" />
                    <span>Start Your Free Trial</span>
                  </div>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neuro-surface py-12 shadow-neuro-inset">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="icon-container icon-container-large">
              <SafeIcon icon={FiChef} className="w-8 h-8 neuro-icon-gradient" />
            </div>
            <div>
              <span className="text-2xl font-bold text-gradient">PantryAI</span>
              <p className="text-sm text-neuro-muted">Smart Kitchen Assistant</p>
            </div>
          </div>
          <p className="text-neuro-secondary">
            © 2024 PantryAI. Revolutionizing kitchens with artificial intelligence.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;