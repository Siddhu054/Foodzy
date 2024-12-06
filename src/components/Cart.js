import React from "react";
import styled from "styled-components";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartContainer = styled.div`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  background: #e23744;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CartCount = styled.span`
  background: white;
  color: #e23744;
  padding: 0.2rem 0.5rem;
  border-radius: 50%;
  font-size: 0.9rem;
  font-weight: bold;
`;

const CartTotal = styled.span`
  font-weight: 500;
`;

const CheckoutButton = styled.button`
  background: white;
  color: #e23744;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-left: 1rem;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background: #f8f8f8;
  }
`;

function Cart() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const getTotalItems = () => {
    return Object.values(cart.items).reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  };

  const getTotalPrice = () => {
    return Object.values(cart.items).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (Object.keys(cart.items).length === 0) return null;

  return (
    <CartContainer>
      <ShoppingCartIcon />
      <CartCount>{getTotalItems()}</CartCount>
      <CartTotal>${getTotalPrice().toFixed(2)}</CartTotal>
      <CheckoutButton onClick={handleCheckout}>Checkout</CheckoutButton>
    </CartContainer>
  );
}

export default Cart;
