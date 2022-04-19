import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import Marginals from './components/marginals/Marginals';
import Homepage from './screens/Homepage';

const App = () => {
  return (
    <Router>
      <Marginals>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Marginals>
    </Router>
  );
};

export default App;
