import React from "react";
import styled from "styled-components";
import { useUser } from "../context/UserContext";

const OrderHistoryContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
`;

const OrderCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const OrderStatus = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  background: ${(props) => {
    switch (props.status) {
      case "processing":
        return "#fff3cd";
      case "delivered":
        return "#d4edda";
      case "cancelled":
        return "#f8d7da";
      default:
        return "#e2e3e5";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "processing":
        return "#856404";
      case "delivered":
        return "#155724";
      case "cancelled":
        return "#721c24";
      default:
        return "#383d41";
    }
  }};
`;

const OrderItems = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
`;

function OrderHistory() {
  const { userData } = useUser();

  return (
    <OrderHistoryContainer>
      <h2>Order History</h2>
      {userData.orders.map((order) => (
        <OrderCard key={order.id}>
          <div>
            <h3>Order #{order.id}</h3>
            <OrderStatus status={order.status}>{order.status}</OrderStatus>
          </div>
          <p>Date: {new Date(order.date).toLocaleDateString()}</p>
          <OrderItems>
            {Object.values(order.items).map((item) => (
              <div key={item.id}>
                {item.name} x {item.quantity} - $
                {(item.price * item.quantity).toFixed(2)}
              </div>
            ))}
          </OrderItems>
          <p>Total: ${order.total.toFixed(2)}</p>
        </OrderCard>
      ))}
    </OrderHistoryContainer>
  );
}

export default OrderHistory;
