import React from 'react';
import ProductCard from './ProductCard';

// Sample product data
const sampleProducts = [
  { id: 1, name: 'Samosa', description: 'Crispy pastry with savory filling', price: 2.50, imageUrl: 'https://via.placeholder.com/150/FFC300/000000?Text=Samosa' },
  { id: 2, name: 'Mango Lassi', description: 'Refreshing yogurt drink', price: 3.00, imageUrl: 'https://via.placeholder.com/150/FF5733/FFFFFF?Text=Lassi' },
  { id: 3, name: 'Basmati Rice (1kg)', description: 'Aged aromatic rice', price: 5.50, imageUrl: 'https://via.placeholder.com/150/C70039/FFFFFF?Text=Rice' },
];

function ProductList() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '20px' }}>
      {sampleProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
