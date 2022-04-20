import React, { useEffect, useState } from 'react';
import Card from '../components/home/Card';

import styled from 'styled-components';
import { Pagination, Spin } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import {
  allUserAction,
  currentUserAction,
  userDetailsAction,
} from '../store/actions/userActions';
import FavouriteCards from '../components/home/FavouriteCards';
import SuggestionsCards from '../components/home/SuggestionCards';

const Container = styled.div`
  width: 100%;
  max-width: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  @media (max-width: 426px) {
    font-size: 20px;
    padding: 0px 50px;
  }
`;

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 0px;
`;

const Status = styled.p`
  font-size: 20px;
  margin-top: 0px;
  margin-bottom: 30px;
`;

const HorizontalLines = styled.div`
  width: 100px;
  background-color: #000;
  height: 1px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px auto;
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
  }, [
    dispatch,
    allUserAction,
    currentUserAction,
    userDetailsAction,
    localStorage.getItem('id'),
  ]);

  if (localStorage.getItem('id')) {
    const index = array.indexOf(localStorage.getItem('id'));
    if (index > -1) {
      array.splice(index, 1);
    }
    array.sort(function (a, b) {
      return allusers[b].likes - allusers[a].likes;
    });
  }

  // var favs = JSON.parse(localStorage.getItem('fav'));

  // const suggestions = array.filter((e) => {
  //   return !favs.includes(e);
  // });

  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <Container>
          {user && user.uid ? (
            <>
              <Title>Status of the Day</Title>
              <HorizontalLines />
              <Status>{localStorage.getItem('status')}</Status>
              <FavouriteCards allusers={allusers} />
              <SuggestionsCards userArray={array} allusers={allusers} />
            </>
          ) : (
            <IntroBanner>
              Heey pal, Welcome to Profilia. Please sign in to continue...
            </IntroBanner>
          )}
        </Container>
      )}
    </>
  );
};

export default Homepage;
