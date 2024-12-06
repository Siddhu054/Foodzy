import React, { useState } from "react";
import styled from "styled-components";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
`;

const OrderSummary = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
`;

const Total = styled(SummaryItem)`
  font-weight: bold;
  border-bottom: none;
  padding-top: 1rem;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #e23744;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: #e23744;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  &:hover {
    background: #d13238;
  }
`;

function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const calculateTotal = () => {
    return Object.values(cart.items).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the order to your backend
    alert("Order placed successfully!");
    clearCart();
    navigate("/");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (Object.keys(cart.items).length === 0) {
    return (
      <CheckoutContainer>
        <h2>Your cart is empty</h2>
      </CheckoutContainer>
    );
  }

  return (
    <CheckoutContainer>
      <h2>Checkout</h2>
      <OrderSummary>
        <h3>Order Summary</h3>
        {Object.values(cart.items).map((item) => (
          <SummaryItem key={item.id}>
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </SummaryItem>
        ))}
        <Total>
          <span>Total</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </Total>
      </OrderSummary>

      <Form onSubmit={handleSubmit}>
        <h3>Delivery Information</h3>
        <Input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="address"
          placeholder="Delivery Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <Input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <Button type="submit">Place Order</Button>
      </Form>
    </CheckoutContainer>
  );
}

export default Checkout;
