import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => (props.fullScreen ? "100vh" : "200px")};
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #e23744;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

function LoadingSpinner({ fullScreen }) {
  return (
    <SpinnerContainer fullScreen={fullScreen}>
      <Spinner />
    </SpinnerContainer>
  );
}

export default LoadingSpinner;
