import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import ProductList from './components/ProductList';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import Orders from './components/Orders';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="container mx-auto">
            <Switch>
              <Route path="/" exact component={ProductList} />
              <Route path="/admin" component={AdminDashboard} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/cart" component={Cart} />
              <Route path="/orders" component={Orders} />
            </Switch>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
