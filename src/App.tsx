import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import {Home, Signup, Signin} from './container/index';
import './App.css';
import PrivateRoute from './components/common/HOC/Index';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
            path={"/"}
            element={
              <PrivateRoute token={window.localStorage.getItem('token')}>
                <Home />
              </PrivateRoute>
            }
          />

          <Route path={"/signup"} element={<Signup/>}/>
          <Route path={"/signin"} element={<Signin/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
