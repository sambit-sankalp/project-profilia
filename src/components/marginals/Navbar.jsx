import React, { useState } from 'react';
import { Drawer, Button, Menu } from 'antd';

import { Link } from 'react-router-dom';

import styled from 'styled-components';

const NavContainer = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  z-index: 999;
`;

const Nav = styled.div`
  width: 100%;
  max-width: 85%;
  display: flex;
  padding: 1rem 0rem;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 426px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .buttons {
    margin: 10px;
    @media (max-width: 426px) {
      margin-top: 5px;
    }
  }
`;

const Logo = styled.h1`
  color: #000000;
  @media (max-width: 426px) {
    margin-top: 20px;
  }
`;

const Navbar = () => {
  return (
    <NavContainer>
      <Nav>
        <Link to="/">
          <Logo>Profilia</Logo>
        </Link>
        <div>
          <Link to="/signin">
            <Button className="buttons" type="primary">
              {' '}
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="buttons" type="primary">
              {' '}
              Sign Up
            </Button>
          </Link>
        </div>
      </Nav>
    </NavContainer>
  );
};

export default Navbar;
