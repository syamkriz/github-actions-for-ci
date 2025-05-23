/**
 * src/components/ProductList.js
 *
 * This component is responsible for fetching and displaying a list of products
 * from the backend API. It handles loading and error states during data fetching
 * and renders a ProductCard for each product received.
 */
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Assuming the frontend (React dev server) and backend server are on different ports,
        // ensure the full URL is used or proxy is set up in package.json (e.g., "proxy": "http://localhost:3001").
        // For simplicity here, we'll assume the backend is on port 3001.
        // In a real app, this URL should come from a config or env variable.
        const response = await fetch('http://localhost:3001/api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        console.error("Failed to fetch products:", e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once on mount

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading products...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error fetching products: {error}</div>;
  }

  if (products.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>No products available at the moment.</div>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '20px' }}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
