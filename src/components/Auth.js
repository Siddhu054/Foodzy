import React, { useState } from "react";
import styled from "styled-components";

const AuthContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #e23744;
  }
`;

const Button = styled.button`
  background: #e23744;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background: #d13238;
  }
`;

const ToggleText = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: #666;
  span {
    color: #e23744;
    cursor: pointer;
  }
`;

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AuthContainer>
      <Form onSubmit={handleSubmit}>
        {!isLogin && (
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit">{isLogin ? "Login" : "Sign Up"}</Button>
      </Form>
      <ToggleText>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign Up" : "Login"}
        </span>
      </ToggleText>
    </AuthContainer>
  );
}

export default Auth;
