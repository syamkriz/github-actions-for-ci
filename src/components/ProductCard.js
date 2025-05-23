/**
 * src/components/ProductCard.js
 *
 * This component is responsible for displaying a single product's information
 * in a card format, including its name, image, description, price, and an
 * "Add to Cart" button. It receives product data as a prop.
 */
import React from 'react';

function ProductCard({ product }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '16px', width: '200px', textAlign: 'center' }}>
      <img src={product.image_url || 'https://via.placeholder.com/150'} alt={product.name} style={{width: '100%', height: 'auto'}} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p><strong>Price:</strong> €{product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
