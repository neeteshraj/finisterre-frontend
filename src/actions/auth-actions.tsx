import { authConstants } from "./constants";

const login =(user: any)=>{
    return async (dispatch: any)=>{
        dispatch({
            type:authConstants.LOGIN_REQUEST, 
            payload:{
                ...user
            }
        });
    }
}

export default login;