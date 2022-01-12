import authReducer from './auth-reducers';
import userReducer from './user-reducers';
import productReducer from './product-reducers';
import orderReducer from './order-reducers';
import categoryReducer from './category-reducers';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    order: orderReducer,
    category: categoryReducer
})

export default rootReducer;