import axiosInstance from "../helpers/axios";
import { authConstants } from "./constants";

const login =(user: any)=>{
    return async (dispatch: any)=>{

        dispatch({type:authConstants.LOGIN_REQUEST});
        const res = await axiosInstance.post(`/admin/signin`,{
            ...user
        });

        if(res.status===200){
            const{token,user}=res.data;
            localStorage.setItem('token',token);
            localStorage.setItem('user',JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token,
                    user
                }
            });
        }
        else{
            if(res.status===400){
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: {error:res.data.error}
                })
            }
        }
    }
}

const isUserLoggedIn =()=>{
    return async (dispatch: any)=>{
        const token = localStorage.getItem('token');
        if(token){
            const user = localStorage.getItem('user');
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token,
                    user
                }
            });
        }
        else{
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error: 'Please login first'
                }
            })
        }
    }
}


export {
    login,
    isUserLoggedIn
};