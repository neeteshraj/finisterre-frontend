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

export default login;