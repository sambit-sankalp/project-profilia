import React, { useState, useMemo, useEffect } from 'react';

import styled from 'styled-components';
import Card from './Card';

import { Pagination } from 'antd';

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 0px;
`;

const Para = styled.p`
  font-size: 20px;
`;

const Wrapper = styled.div`
  margin-top: 40px;
  .pagination-bar {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
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

const FavouriteCards = ({ allusers }) => {
  const PageSize = 3;
  const [currentPage, setCurrentPage] = useState(1);
  var favs = JSON.parse(localStorage.getItem('fav'));

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return favs && favs.length && favs.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <Wrapper>
      <Title>Your Favourites</Title>
      <HorizontalLines />
      <CardContainer>
        {currentTableData ? (
          currentTableData.map((fav, i) => (
            <Card key={fav} data={allusers[fav]} />
          ))
        ) : (
          <Para>Share your ❤ by clicking ❤</Para>
        )}
      </CardContainer>
      {favs && favs.length > PageSize && (
        <Pagination
          className="pagination-bar"
          defaultCurrent={1}
          pageSize={PageSize}
          current={currentPage}
          total={favs.length}
          onChange={(page) => setCurrentPage(page)}
        />
      )}
    </Wrapper>
  );
};

export default FavouriteCards;
