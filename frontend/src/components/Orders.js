import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(`/api/orders/${user._id}`);
      setOrders(response.data);
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4">
              <h3 className="text-xl">Order ID: {order._id}</h3>
              <p>Total Amount: ${order.totalAmount}</p>
              <h4 className="font-bold mt-2">Products:</h4>
              {order.products.map((product) => (
                <p key={product.productId._id}>
                  {product.productId.name} - Quantity: {product.quantity}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
