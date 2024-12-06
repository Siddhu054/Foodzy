import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem("cart");
    return savedCart
      ? JSON.parse(savedCart)
      : { items: {}, restaurantId: null };
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (restaurantId, item) => {
    setCart((prevCart) => {
      // If adding from a different restaurant, clear the cart first
      if (prevCart.restaurantId && prevCart.restaurantId !== restaurantId) {
        if (
          !window.confirm(
            "Adding items from a different restaurant will clear your current cart. Continue?"
          )
        ) {
          return prevCart;
        }
        return {
          items: { [item.id]: { ...item, quantity: 1 } },
          restaurantId,
        };
      }

      const updatedItems = { ...prevCart.items };
      if (updatedItems[item.id]) {
        updatedItems[item.id] = {
          ...updatedItems[item.id],
          quantity: updatedItems[item.id].quantity + 1,
        };
      } else {
        updatedItems[item.id] = { ...item, quantity: 1 };
      }

      return {
        items: updatedItems,
        restaurantId,
      };
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const updatedItems = { ...prevCart.items };
      if (updatedItems[itemId].quantity > 1) {
        updatedItems[itemId] = {
          ...updatedItems[itemId],
          quantity: updatedItems[itemId].quantity - 1,
        };
      } else {
        delete updatedItems[itemId];
      }
      return {
        ...prevCart,
        items: updatedItems,
      };
    });
  };

  const clearCart = () => {
    setCart({ items: {}, restaurantId: null });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
