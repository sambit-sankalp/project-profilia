import React, { useEffect } from 'react';
import Card from '../components/home/Card';

import styled from 'styled-components';
import { Pagination } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { allUserAction, currentUserAction } from '../store/actions/userActions';

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

const IntroBanner = styled.div`
  width: 100%;
  font-size: 40px;
  padding: 0px 200px;
  min-height: 63vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Homepage = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.allUserReducer);
  const { loading, error, allusers } = data;

  const currentUser = useSelector((state) => state.currentUser);
  const { user } = currentUser;

  let array = Object.keys(allusers);

  useEffect(() => {
    dispatch(currentUserAction());
    dispatch(allUserAction());
  }, [dispatch, allUserAction]);

  if (localStorage.getItem('id')) {
    const index = array.indexOf(localStorage.getItem('id'));
    if (index > -1) {
      array.splice(index, 1);
    }
    array.sort(function (a, b) {
      return allusers[b].likes - allusers[a].likes;
    });
  }

  return (
    <Container>
      {user && user.uid ? (
        <>
          <CardContainer>
            {array.map((k, i) => {
              return <Card key={i} data={allusers[k]} />;
            })}
          </CardContainer>
          <Pagination
            style={{ marginTop: '50px' }}
            defaultCurrent={1}
            total={50}
          />
        </>
      ) : (
        <IntroBanner>
          Heey pal, Welcome to Profilia. Please sign in to continue...
        </IntroBanner>
      )}
    </Container>
  );
};

export default Homepage;
