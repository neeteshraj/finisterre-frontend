import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Home, Signup, Signin} from './container/index';
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
