import React from 'react';
import NavigationBar from './components/NavigationBar';
import ProductList from './components/ProductList';
import './App.css'; // Create this file for App specific styles if needed, or remove if not used.

function App() {
  return (
    <div>
      <NavigationBar />
      <ProductList />
      {/* Add Footer or other components here later */}
    </div>
  );
}

export default App;
