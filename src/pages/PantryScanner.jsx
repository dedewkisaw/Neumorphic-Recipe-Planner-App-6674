import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { usePantry } from '../context/PantryContext';

const { FiCamera, FiPlus, FiX, FiCheck, FiPackage, FiEdit3, FiTrash2 } = FiIcons;

const PantryScanner = () => {
  const { pantryItems, addPantryItem, removePantryItem, updatePantryItem } = usePantry();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedItems, setScannedItems] = useState([]);
  const [showManualAdd, setShowManualAdd] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', category: '', expiryDate: '' });
  const [editingItem, setEditingItem] = useState(null);
  const fileInputRef = useRef(null);

  const categories = [
    'Fruits & Vegetables',
    'Dairy & Eggs',
    'Meat & Seafood',
    'Pantry Staples',
    'Beverages',
    'Snacks',
    'Frozen Foods',
    'Other'
  ];

  const mockScanResults = [
    { name: 'Tomatoes', quantity: '3', category: 'Fruits & Vegetables', confidence: 95 },
    { name: 'Milk', quantity: '1 gallon', category: 'Dairy & Eggs', confidence: 92 },
    { name: 'Chicken Breast', quantity: '2 lbs', category: 'Meat & Seafood', confidence: 88 },
    { name: 'Rice', quantity: '1 bag', category: 'Pantry Staples', confidence: 94 },
    { name: 'Onions', quantity: '5', category: 'Fruits & Vegetables', confidence: 91 }
  ];

  const handleScan = async () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      const randomItems = mockScanResults
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.floor(Math.random() * 3) + 2);
      setScannedItems(randomItems);
      setIsScanning(false);
    }, 3000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleScan();
    }
  };

  const confirmScannedItem = (item) => {
    addPantryItem({
      ...item,
      id: Date.now(),
      dateAdded: new Date().toISOString()
    });
    setScannedItems(prev => prev.filter(i => i !== item));
  };

  const rejectScannedItem = (item) => {
    setScannedItems(prev => prev.filter(i => i !== item));
  };

  const handleManualAdd = () => {
    if (newItem.name.trim()) {
      addPantryItem({
        ...newItem,
        id: Date.now(),
        dateAdded: new Date().toISOString()
      });
      setNewItem({ name: '', quantity: '', category: '', expiryDate: '' });
      setShowManualAdd(false);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem({ ...item });
  };

  const saveEditedItem = () => {
    if (editingItem) {
      updatePantryItem(editingItem.id, editingItem);
      setEditingItem(null);
    }
  };

  const cancelEdit = () => {
    setEditingItem(null);
  };

  return (
    <div className="flex-1 bg-neuro-bg p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Pantry <span className="gradient-text">Scanner</span>
          </h1>
          <p className="text-xl text-gray-600">
            Scan or add items to your digital pantry
          </p>
        </motion.div>

        {/* Scanner Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Camera Scanner */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="neuro-card p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Camera Scanner</h2>
            
            <div className="relative mb-6">
              <div className="neuro-card p-8 bg-gray-50 h-48 flex items-center justify-center">
                {isScanning ? (
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 border-4 border-neuro-accent border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <p className="text-gray-600">Scanning items...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <SafeIcon icon={FiCamera} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Ready to scan</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <motion.button
                onClick={handleScan}
                disabled={isScanning}
                className="neuro-button w-full py-4 text-lg font-semibold text-white bg-gradient-to-r from-neuro-accent to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isScanning ? 1 : 1.02 }}
                whileTap={{ scale: isScanning ? 1 : 0.98 }}
              >
                {isScanning ? 'Scanning...' : 'Start Camera Scan'}
              </motion.button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <motion.button
                onClick={() => fileInputRef.current?.click()}
                className="neuro-button w-full py-3 text-gray-700 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Upload Photo
              </motion.button>
            </div>
          </motion.div>

          {/* Manual Add */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="neuro-card p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manual Entry</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="neuro-input w-full p-3 text-gray-800"
                  placeholder="Enter item name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <input
                  type="text"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                  className="neuro-input w-full p-3 text-gray-800"
                  placeholder="e.g., 2 lbs, 1 gallon"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="neuro-input w-full p-3 text-gray-800"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date (Optional)</label>
                <input
                  type="date"
                  value={newItem.expiryDate}
                  onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
                  className="neuro-input w-full p-3 text-gray-800"
                />
              </div>

              <motion.button
                onClick={handleManualAdd}
                disabled={!newItem.name.trim()}
                className="neuro-button w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-neuro-success to-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: newItem.name.trim() ? 1.02 : 1 }}
                whileTap={{ scale: newItem.name.trim() ? 0.98 : 1 }}
              >
                Add Item
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scanned Items */}
        <AnimatePresence>
          {scannedItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="neuro-card p-6 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Confirm Scanned Items</h2>
              <div className="space-y-4">
                {scannedItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.quantity} • {item.category} • {item.confidence}% confidence
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <motion.button
                        onClick={() => confirmScannedItem(item)}
                        className="neuro-button p-2 text-neuro-success"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <SafeIcon icon={FiCheck} className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        onClick={() => rejectScannedItem(item)}
                        className="neuro-button p-2 text-red-500"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <SafeIcon icon={FiX} className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pantry Items List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="neuro-card p-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Pantry ({pantryItems.length} items)</h2>
          
          {pantryItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pantryItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="meal-card p-4"
                >
                  {editingItem?.id === item.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editingItem.name}
                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                        className="neuro-input w-full p-2 text-sm"
                      />
                      <input
                        type="text"
                        value={editingItem.quantity}
                        onChange={(e) => setEditingItem({ ...editingItem, quantity: e.target.value })}
                        className="neuro-input w-full p-2 text-sm"
                      />
                      <div className="flex space-x-2">
                        <motion.button
                          onClick={saveEditedItem}
                          className="neuro-button px-3 py-1 text-sm text-neuro-success"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <SafeIcon icon={FiCheck} className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          onClick={cancelEdit}
                          className="neuro-button px-3 py-1 text-sm text-red-500"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <SafeIcon icon={FiX} className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <div className="flex space-x-1">
                          <motion.button
                            onClick={() => handleEditItem(item)}
                            className="neuro-button p-1 text-gray-600"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            onClick={() => removePantryItem(item.id)}
                            className="neuro-button p-1 text-red-500"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{item.quantity}</p>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <SafeIcon icon={FiPackage} className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Your pantry is empty</p>
              <p>Start scanning or adding items to get started!</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PantryScanner;