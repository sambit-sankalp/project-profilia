import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import Marginals from './components/marginals/Marginals';
import Homepage from './screens/Homepage';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';

const App = () => {
  return (
    <div>
      <Router>
        <Marginals>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Marginals>
      </Router>
    </div>
  );
};

export default App;
