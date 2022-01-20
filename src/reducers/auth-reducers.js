/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable default-case */

import { authConstants } from "../actions/constants";

const initState ={
    token: null,
    user:{
        firstName:'',
        lastName:'',
        email:'',
        picture:'',
        role:''
    },
    isAuthenticated:false,
    isAuthenticating:false,
    isLoading:false,
    error:null,
    message:''
};

export default (state=initState, action) => {
    
    // console.log('authReducer', action);
    
    switch(action.type) {
        case authConstants.LOGIN_REQUEST:
            state={
                ...state,
                isAuthenticating:true
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state={
                ...state,
                isAuthenticating:false,
                isAuthenticated:true,
                token:action.payload.token,
                user:action.payload.user
            }
            break;
        case authConstants.LOGOUT_REQUEST:
            state={
                ...state,
                isLoading:true
            }
            break;
        case authConstants.LOGOUT_SUCCESS:
            state={
                ...initState
            }
            break;
        case authConstants.LOGIN_FAILURE:
            state={
                ...state,
                error:action.payload.error,
                isLoading: false
            }
            break;
    }
    return state;
}


