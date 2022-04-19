import React, { createContext, useEffect, useState } from 'react';

// Context Created
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [isAnonymous, setisAnonymous] = useState(
    localStorage.getItem('isAnonymous')
  );
  const [currentUser, setcurrentUser] = useState('');

  useEffect(() => {
    setcurrentUser(localStorage.getItem('name'));
    console.log(currentUser);
    if (isAnonymous) {
      setcurrentUser(localStorage.getItem('name'));
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ isAnonymous, setisAnonymous, currentUser, setcurrentUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
