import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: #fff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  color: #e23744;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: #e23744;
  }
`;

function Navbar() {
  return (
    <Nav>
      <NavContainer>
        <Logo to="/">Foodzy</Logo>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/restaurants">Restaurants</NavLink>
          <NavLink to="/auth">Login</NavLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
}

export default Navbar;
