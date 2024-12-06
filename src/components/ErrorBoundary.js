import React from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
  padding: 2rem;
  text-align: center;
  background: #fff3f3;
  border-radius: 8px;
  margin: 2rem;
`;

const ErrorButton = styled.button`
  background: #e23744;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  &:hover {
    background: #d13238;
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <h2>Oops! Something went wrong.</h2>
          <p>We're sorry for the inconvenience.</p>
          <ErrorButton onClick={() => window.location.reload()}>
            Refresh Page
          </ErrorButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
