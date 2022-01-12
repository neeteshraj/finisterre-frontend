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
import Products from './container/Products/Products';
import Orders from './container/Orders/Orders';
import Category from './container/category/Category';



function App() {

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  //component didMount or didNotMount
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
        <PrivateRoute path="/products"  component={Products} />
        <PrivateRoute path="/orders" component={Orders} />
        <PrivateRoute path="/category" component={Category} />

        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}


export default App;
