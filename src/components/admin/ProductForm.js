/**
 * src/components/admin/ProductForm.js
 *
 * This component renders a form for creating or editing a product.
 * It takes an optional `productToEdit` prop to pre-fill the form for editing.
 * On submission, it calls the `onFormSubmit` prop with the product data and
 * (if editing) the product ID. It also handles form state and input changes.
 */
import React, { useState, useEffect } from 'react';

function ProductForm({ productToEdit, onFormSubmit, clearEdit }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setDescription(productToEdit.description);
      setPrice(productToEdit.price);
      setImageUrl(productToEdit.image_url || '');
      setStock(productToEdit.stock);
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
      setStock('');
    }
  }, [productToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = { name, description, price: parseFloat(price), image_url: imageUrl, stock: parseInt(stock, 10) };
    // TODO: Implement actual API call for create/update
    onFormSubmit(productData, productToEdit ? productToEdit.id : null);
    if (!productToEdit) { // Clear form only if it was a new product
        setName(''); setDescription(''); setPrice(''); setImageUrl(''); setStock('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd' }}>
      <h3>{productToEdit ? 'Edit Product' : 'Add New Product'}</h3>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>Price (€):</label>
        <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>Image URL:</label>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>Stock:</label>
        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
      </div>
      <button type="submit" style={{ marginTop: '20px' }}>{productToEdit ? 'Update Product' : 'Add Product'}</button>
      {productToEdit && <button type="button" onClick={clearEdit} style={{ marginLeft: '10px'}}>Cancel Edit</button>}
    </form>
  );
}

export default ProductForm;
