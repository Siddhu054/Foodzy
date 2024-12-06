import React, { createContext, useContext, useState, useCallback } from "react";
import Toast from "../components/Toast";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const showToast = useCallback((text, type = "info") => {
    const id = Date.now();
    setMessages((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }, 3000);
  }, []);

  const dismissToast = useCallback((id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast messages={messages} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
