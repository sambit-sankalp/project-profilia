import React from 'react';
import Navbar from './Navbar';

import styled from 'styled-components';

const Container = styled.div`
  margin-top: 100px;
  width: 100%;
  display: flex;
  height: 100%;
  min-height: 95vh;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
  background-color: #efefef;
  @media (max-width: 426px) {
    margin-top: 170px;
  }
`;

const Footer = styled.footer`
  color: #000;
  font-size: 20px;
  text-align: center;
  margin-bottom: 0px;
  background-color: #efefef;
  overflow: hidden;
  margin-top: 100px;
`;

const Marginals = ({ children }) => {
  return (
    <div style={{ backgroundColor: '#efefef' }}>
      <Navbar />
      <Container>{children}</Container>
      <Footer>Made with ❤ by Sambit Sankalp</Footer>
    </div>
  );
};

export default Marginals;
