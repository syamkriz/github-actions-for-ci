/**
 * src/components/admin/AdminDashboard.js
 *
 * This component serves as the main interface for administrators after login.
 * It allows admins to manage products by viewing, adding, editing, and deleting them.
 * It fetches product data from the backend, interacts with the ProductForm for
 * product creation/editing, and handles API calls for all CRUD operations on products.
 */
import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';

function AdminDashboard({ onLogout }) {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [error, setError] = useState(''); // For displaying errors to the user

  const fetchProducts = async () => {
    setError('');
    try {
      const response = await fetch('http://localhost:3001/api/products');
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ msg: 'Failed to fetch products' }));
        throw new Error(errorData.msg);
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products for admin:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFormSubmit = async (productData, id) => {
    setError('');
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setError("Admin token not found. Please login again.");
      onLogout(); // Optional: force logout
      return;
    }

    try {
      let response;
      const url = id ? `http://localhost:3001/api/products/${id}` : 'http://localhost:3001/api/products';
      const method = id ? 'PUT' : 'POST';

      response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ msg: `Failed to ${id ? 'update' : 'create'} product` }));
        if (response.status === 401) {
            setError("Session expired or invalid. Please login again.");
            onLogout(); // Force logout on auth error
            return;
        }
        throw new Error(errorData.msg);
      }
      
      // const savedProduct = await response.json(); // Contains the product from DB
      fetchProducts(); // Refresh product list from server
      setEditingProduct(null);
      setShowProductForm(false);

    } catch (err) {
      console.error("Error submitting product:", err);
      setError(err.message);
    }
  };
  
  const handleDelete = async (productId) => {
    setError('');
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setError("Admin token not found. Please login again.");
      onLogout(); // Optional: force logout
      return;
    }

    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/products/${productId}`, {
          method: 'DELETE',
          headers: { 'x-auth-token': token },
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ msg: 'Failed to delete product' }));
          if (response.status === 401) {
            setError("Session expired or invalid. Please login again.");
            onLogout(); // Force logout on auth error
            return;
          }
          throw new Error(errorData.msg);
        }
        fetchProducts(); // Refresh product list
      } catch (err) {
        console.error("Error deleting product:", err);
        setError(err.message);
      }
    }
  };
  
  const clearEditState = () => {
    setEditingProduct(null);
    setShowProductForm(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
    setError(''); // Clear previous errors
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h2>Admin Dashboard - Product Management</h2>
        <button onClick={onLogout}>Logout</button>
      </div>
      
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <button onClick={() => { setEditingProduct(null); setShowProductForm(!showProductForm); setError(''); }} style={{ margin: '10px 0' }}>
        {showProductForm && !editingProduct ? 'Cancel Add Product' : 'Add New Product'}
      </button>

      {showProductForm && <ProductForm productToEdit={editingProduct} onFormSubmit={handleFormSubmit} clearEdit={clearEditState} />}

      <h3>Existing Products</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr>
            <th style={{border: '1px solid #ddd', padding: '8px'}}>Name</th>
            <th style={{border: '1px solid #ddd', padding: '8px'}}>Price</th>
            <th style={{border: '1px solid #ddd', padding: '8px'}}>Stock</th>
            <th style={{border: '1px solid #ddd', padding: '8px'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td style={{border: '1px solid #ddd', padding: '8px'}}>{product.name}</td>
              <td style={{border: '1px solid #ddd', padding: '8px'}}>€{product.price ? product.price.toFixed(2) : 'N/A'}</td>
              <td style={{border: '1px solid #ddd', padding: '8px'}}>{product.stock}</td>
              <td style={{border: '1px solid #ddd', padding: '8px'}}>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)} style={{ marginLeft: '5px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
