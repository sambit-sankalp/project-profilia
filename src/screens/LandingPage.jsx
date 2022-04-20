import React from 'react';
import styled from 'styled-components';

const Greet = styled.h1`
  text-align: left;
  font-size: 40px;
  font-weight: 700;
  color: #2b394a;
`;

const Body = styled.p`
  width: 80%;
  text-align: left;
  font-size: 20px;
  font-weight: 400;
`;

const LandingPage = () => {
  return (
    <div>
      <Greet>WELCOME TO PROFILIA,</Greet>
      <Body>
        Wanna create a profile to be liked and loved by all. Make friends and
        establish new connections.Be the most like member in the community and
        become favourite of other, then what are you waiting for.
      </Body>
      <Body>Log in now and go to the most beautiful world, even seen.</Body>
    </div>
  );
};

export default LandingPage;
