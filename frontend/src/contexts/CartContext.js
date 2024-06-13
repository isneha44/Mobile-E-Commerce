import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return action.payload;
    case 'ADD_TO_CART':
      return { ...state, products: [...state.products, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, products: state.products.filter(p => p.productId !== action.payload) };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { products: [] });

  const setCart = async (userId) => {
    const response = await axios.get(`/api/cart/${userId}`);
    dispatch({ type: 'SET_CART', payload: response.data });
  };

  const addToCart = async (userId, productId, quantity) => {
    const response = await axios.post(`/api/cart/${userId}`, { productId, quantity });
    dispatch({ type: 'SET_CART', payload: response.data });
  };

  const removeFromCart = async (userId, productId) => {
    const response = await axios.delete(`/api/cart/${userId}/${productId}`);
    dispatch({ type: 'SET_CART', payload: response.data });
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
