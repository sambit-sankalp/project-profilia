import React from 'react';
import Navbar from './Navbar';

import styled from 'styled-components';

const Container = styled.div`
  margin-top: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
  overflow-x: hidden;
`;

const Footer = styled.footer`
  color: #000;
  font-size: 20px;
  text-align: center;
  margin-top: 130px;
`;

const Marginals = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Container>{children}</Container>
      <Footer>Made with ❤ by Sambit Sankalp</Footer>
    </div>
  );
};

export default Marginals;
