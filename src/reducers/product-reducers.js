/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable default-case */
import { productConstants } from "../actions/constants";

const initialState = {
    products: []
}

export default (state= initialState,action)=>{
    switch(action.type){
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state={
                ...state,
                products:action.payload.products
            }
            break;
    }
    return state;
}