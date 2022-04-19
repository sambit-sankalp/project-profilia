import React, { useState, useEffect, useContext } from 'react';
import { Button, Tooltip } from 'antd';

import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import {
  googleAuthAction,
  signInAnonymouslyAction,
} from '../../store/actions/userActions';
import Profile from './Profile';

import { signOut } from 'firebase/auth';
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  onValue,
  update,
} from 'firebase/database';
import { auth, db } from '../../config/firebase';

import {
  GoogleOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { UserContext } from '../../context/UserContext';

const NavContainer = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c6daff;
  z-index: 999;
`;

const Nav = styled.div`
  width: 100%;
  max-width: 85%;
  display: flex;
  padding: 1rem 0rem;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 426px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .buttons {
    margin: 10px;
    @media (max-width: 426px) {
      margin-top: 5px;
    }
  }
`;

const Logo = styled.h1`
  color: #000000;
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
  const { isAnonymous, setisAnonymous, setcurrentUser } =
    useContext(UserContext);
  const [cur, setCur] = useState({});
  const dispatch = useDispatch();

  const presentUser = useSelector((state) => state.currentUser);
  const { user } = presentUser;

  const anonymousUser = useSelector((state) => state.anonymousAuth);
  const { user: anonymous } = anonymousUser;

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
        console.log('signOut');
        window.location.reload(false);
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
          <Logo>Profilia</Logo>
        </Link>
        {cur && cur.uid ? (
          <Header>
            <p
              style={{
                marginRight: '10px',
                fontSize: '20px',
                fontWeight: 500,
                marginBottom: 0,
              }}
            >
              Hi, {localStorage.getItem('name')}
            </p>
            <Profile isAnonymous={isAnonymous} />
            <Tooltip title="Sign Out">
              <Button
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
                style={{ marginRight: '10px' }}
                type="primary"
                shape="circle"
                onClick={() =>
                  dispatch(googleAuthAction(), setisAnonymous(false))
                }
                icon={<GoogleOutlined />}
                size="large"
              />
            </Tooltip>
            <Tooltip title="Anonymous Sign In">
              <Button
                onClick={() =>
                  dispatch(signInAnonymouslyAction(), setisAnonymous(true))
                }
                type="primary"
                shape="circle"
                icon={<UserOutlined />}
                size="large"
              />
            </Tooltip>
          </div>
        )}
      </Nav>
    </NavContainer>
  );
};

export default Navbar;
