import React from 'react';
import Card from '../components/home/Card';

import styled from 'styled-components';
import { Pagination } from 'antd';
import Marginals from '../components/marginals/Marginals';

const Container = styled.div`
  width: 100%;
  max-width: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Homepage = () => {
  return (
    <Container>
      <CardContainer>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </CardContainer>
      <Pagination style={{ marginTop: '50px' }} defaultCurrent={1} total={50} />
    </Container>
  );
};

export default Homepage;
