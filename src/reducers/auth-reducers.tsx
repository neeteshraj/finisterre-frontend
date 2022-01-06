import { authConstants } from "../actions/constants";

const initState ={
    name: 'Nitesh Raj Khanal',

};

const authReducer=(state=initState, action: any) => {
    
    console.log('authReducer', action);
    
    switch(action.type) {
        case authConstants.LOGIN_REQUEST:
            state={
                ...state,
                ...action.payload
            }
            break;
    }
    return state;
}

export default authReducer;

