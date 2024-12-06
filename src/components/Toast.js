import React from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

const ToastMessage = styled.div`
  background: ${({ type }) => {
    switch (type) {
      case "success":
        return "#4caf50";
      case "error":
        return "#f44336";
      case "info":
        return "#2196f3";
      default:
        return "#333";
    }
  }};
  color: white;
  padding: 16px 24px;
  border-radius: 4px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  animation: ${slideIn} 0.3s ease;

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

function Toast({ messages = [], onDismiss }) {
  return (
    <ToastContainer>
      {messages.map((msg) => (
        <ToastMessage
          key={msg.id}
          type={msg.type}
          onClick={() => onDismiss(msg.id)}
        >
          {msg.text}
        </ToastMessage>
      ))}
    </ToastContainer>
  );
}

export default Toast;
