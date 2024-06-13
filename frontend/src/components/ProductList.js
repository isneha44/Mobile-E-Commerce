import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    axios.get('/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleAddToCart = (productId) => {
    addToCart(user._id, productId, 1);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product._id} className="border p-4">
            <h2 className="text-xl">{product.name}</h2>
            <p>{product.description}</p>
            <p className="text-green-500">${product.price}</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded mt-2" onClick={() => handleAddToCart(product._id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
