import React,{ useEffect } from 'react';
import { 
  Switch, 
  Route
} from 'react-router-dom';
import {
  Home, 
  Signup, 
  Signin
}from './container/index';
import './App.css';
import PrivateRoute from './components/common/HOC/Index';
import {
  useDispatch, 
  useSelector
} from 'react-redux';
import {isUserLoggedIn} from './actions/auth-actions';



function App() {

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  //component didMount or didnotMount
  useEffect(() => {
        if(!auth.isAuthenticated){
            dispatch(isUserLoggedIn());
        }
  },
  [auth.isAuthenticated]);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}


export default App;
