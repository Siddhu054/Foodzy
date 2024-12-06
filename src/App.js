import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Restaurants from "./components/Restaurants";
import RestaurantDetail from "./components/RestaurantDetail";
import Auth from "./components/Auth";
import Checkout from "./components/Checkout";
import OrderHistory from "./components/OrderHistory";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import { ToastProvider } from "./context/ToastContext";
import ErrorBoundary from "./components/ErrorBoundary";
import AddressManager from "./components/AddressManager";
import "./App.css";

function App() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <CartProvider>
          <ToastProvider>
            <Router>
              <div className="App">
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/restaurants" element={<Restaurants />} />
                  <Route
                    path="/restaurant/:id"
                    element={<RestaurantDetail />}
                  />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/orders" element={<OrderHistory />} />
                  <Route path="/address" element={<AddressManager />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </Router>
          </ToastProvider>
        </CartProvider>
      </UserProvider>
    </ErrorBoundary>
  );
}

export default App;
