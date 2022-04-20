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

const SuggestionsCards = ({ userArray, allusers }) => {
  const PageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);

  var favs = JSON.parse(localStorage.getItem('fav'));

  var suggestions;
  if (favs) {
    suggestions = userArray.filter((u) => {
      return favs && !favs.includes(u);
    });
  } else {
    suggestions = userArray;
  }

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return suggestions.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);
  return (
    <Wrapper>
      <Title>Some Suggestions</Title>
      <HorizontalLines />
      <CardContainer>
        {currentTableData && currentTableData.length ? (
          currentTableData.map((fav, i) => (
            <Card key={fav} data={allusers[fav]} />
          ))
        ) : (
          <Para>Seems, you like others very much</Para>
        )}
      </CardContainer>
      {suggestions && suggestions.length > PageSize && (
        <Pagination
          className="pagination-bar"
          defaultCurrent={1}
          pageSize={PageSize}
          current={currentPage}
          total={suggestions.length}
          onChange={(page) => setCurrentPage(page)}
        />
      )}
    </Wrapper>
  );
};

export default SuggestionsCards;
