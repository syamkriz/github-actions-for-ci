import React from 'react';

function ProductCard({ product }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '16px', width: '200px', textAlign: 'center' }}>
      <img src={product.imageUrl || 'https://via.placeholder.com/150'} alt={product.name} style={{width: '100%', height: 'auto'}} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p><strong>Price:</strong> €{product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
