import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers"
import { configureStore } from '@reduxjs/toolkit'



const store = createStore(rootReducer,applyMiddleware(thunk));




export default store;