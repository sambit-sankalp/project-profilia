import React from 'react';
import Card from '../components/home/Card';

import styled from 'styled-components';
import { Pagination } from 'antd';

import { ref, onValue } from 'firebase/database';
import { db } from '../config/firebase';

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
  const starCountRef = ref(db, 'users/');
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });

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
