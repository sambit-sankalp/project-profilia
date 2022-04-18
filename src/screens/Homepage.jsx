import React, { useEffect } from 'react';
import Card from '../components/home/Card';

import styled from 'styled-components';
import { Pagination } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { allUserAction } from '../store/actions/userActions';

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
  const dispatch = useDispatch();

  const data = useSelector((state) => state.allUserReducer);
  const { loading, error, allusers } = data;

  console.log(allusers);

  useEffect(() => {
    dispatch(allUserAction());
  }, [dispatch, allUserAction]);

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
