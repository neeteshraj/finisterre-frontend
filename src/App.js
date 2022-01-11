import React from 'react';
import { Switch, Route} from 'react-router-dom';
import {Home, Signup, Signin} from './container/index';
import './App.css';
import PrivateRoute from './components/common/HOC/Index';



function App() {
  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        {/* <PrivateRoute path="/page" component={NewPage} /> */}
        


        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}


export default App;
