import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem("userData");
    return saved
      ? JSON.parse(saved)
      : {
          favorites: [],
          orders: [],
          reviews: [],
          addresses: [],
          currentAddress: null,
          location: null,
        };
  });

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  const addToFavorites = (restaurantId) => {
    setUserData((prev) => ({
      ...prev,
      favorites: prev.favorites.includes(restaurantId)
        ? prev.favorites.filter((id) => id !== restaurantId)
        : [...prev.favorites, restaurantId],
    }));
  };

  const addOrder = (order) => {
    setUserData((prev) => ({
      ...prev,
      orders: [
        ...prev.orders,
        { ...order, id: Date.now(), status: "processing", date: new Date() },
      ],
    }));
  };

  const addReview = (review) => {
    setUserData((prev) => ({
      ...prev,
      reviews: [
        ...prev.reviews,
        { ...review, id: Date.now(), date: new Date() },
      ],
    }));
  };

  const updateLocation = (location) => {
    setUserData((prev) => ({
      ...prev,
      location,
    }));
  };

  const updateAddress = (address) => {
    setUserData((prev) => ({
      ...prev,
      addresses: prev.addresses.some(
        (addr) => addr.lat === address.lat && addr.lng === address.lng
      )
        ? prev.addresses
        : [...prev.addresses, address],
      currentAddress: address,
    }));
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        addToFavorites,
        addOrder,
        addReview,
        updateLocation,
        updateAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
