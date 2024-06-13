import React, { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Cart = () => {
  const { cart, setCart, removeFromCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setCart(user._id);
    }
  }, [user, setCart]);

  const handleRemove = (productId) => {
    removeFromCart(user._id, productId);
  };

  const handleCheckout = async () => {
    // Simulate redirection to a dummy payment page
    alert('Redirecting to payment gateway...');
    await axios.post(`/api/orders/${user._id}`);
    setCart(user._id);
    window.location.href = 'https://dummy-payment-gateway.com';
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.products.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {cart.products.map((item) => (
            <div key={item.productId._id} className="border p-4 flex justify-between items-center">
              <div>
                <h3 className="text-xl">{item.productId.name}</h3>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={() => handleRemove(item.productId._id)}>
                Remove
              </button>
            </div>
          ))}
          <button className="bg-green-500 text-white py-2 px-4 rounded" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
