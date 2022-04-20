import React, { useState, useEffect, useContext } from 'react';
import { Button, Tooltip } from 'antd';

import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import {
  googleAuthAction,
  signInAnonymouslyAction,
  userDetailsAction,
} from '../../store/actions/userActions';
import Profile from './Profile';

import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';

import {
  GoogleOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import { UserContext } from '../../context/UserContext';

const NavContainer = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2b394a;
  z-index: 999;
`;

const Nav = styled.div`
  width: 100%;
  max-width: 85%;
  display: flex;
  height: 100px;
  padding: 1rem 0rem;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 426px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 170px;
  }
  .buttons {
    margin: 10px;
    @media (max-width: 426px) {
      margin-top: 5px;
    }
  }
`;

const Logo = styled.h1`
  color: #ffffff;
  font-weight: 'bold';
  margin-bottom: 0px;
  @media (max-width: 426px) {
    margin-top: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Navbar = () => {
  const { isAnonymous, setcurrentUser } =
    useContext(UserContext);
  const [cur, setCur] = useState({});
  const dispatch = useDispatch();

  const presentUser = useSelector((state) => state.currentUser);
  const { user } = presentUser;

  const anonymousUser = useSelector((state) => state.anonymousAuth);
  const { user: anonymous } = anonymousUser;

  console.log(isAnonymous);

  useEffect(() => {
    if (user) {
      setCur(user);
      setcurrentUser(user.displayName);
    } else {
      if (anonymous) {
        setcurrentUser(anonymous.first);
      }
    }
  }, [dispatch, user]);

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        window.location.reload(false);
        console.log('signOut');
        localStorage.removeItem('likes');
        localStorage.removeItem('dislikes');
        localStorage.removeItem('fav');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <NavContainer>
      <Nav>
        <Link to="/">
          <Logo>PROFILIA</Logo>
        </Link>
        {cur && cur.uid ? (
          <Header>
            <p
              style={{
                marginRight: '10px',
                fontSize: '20px',
                fontWeight: 700,
                marginBottom: 0,
                color: '#fff',
              }}
            >
              Hi, {localStorage.getItem('name')}
            </p>
            <Profile isAnonymous={isAnonymous} />
            <Tooltip title="Sign Out">
              <Button
              style={{
                marginRight: '10px',
                backgroundColor: '#b67473',
                color: '#fff',
                border: 'none',
              }}
                onClick={signOutHandler}
                type="primary"
                shape="circle"
                icon={<LogoutOutlined />}
                size="large"
              />
            </Tooltip>
          </Header>
        ) : (
          <div>
            <Tooltip title="Google Sign In">
              <Button
                style={{
                  marginRight: '10px',
                  backgroundColor: '#b67473',
                  color: '#fff',
                  border: 'none',
                }}
                shape="circle"
                onClick={() => dispatch(googleAuthAction())}
                icon={<GoogleOutlined />}
                size="large"
              />
            </Tooltip>
            <Tooltip title="Anonymous Sign In">
              <Button
                style={{
                  marginRight: '10px',
                  backgroundColor: '#b67473',
                  color: '#fff',
                  border: 'none',
                }}
                onClick={() => dispatch(signInAnonymouslyAction())}
                shape="circle"
                icon={<UserOutlined />}
                size="large"
              />
            </Tooltip>
            {localStorage.getItem('anonymousId') && (
              <Tooltip title="Existing Anonymous Sign In">
                <Button
                  style={{
                    backgroundColor: '#b67473',
                    color: '#fff',
                    border: 'none',
                  }}
                  onClick={() => dispatch(userDetailsAction())}
                  shape="circle"
                  icon={<LoginOutlined />}
                  size="large"
                />
              </Tooltip>
            )}
          </div>
        )}
      </Nav>
    </NavContainer>
  );
};

export default Navbar;
