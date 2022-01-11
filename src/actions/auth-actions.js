import axiosInstance from "../helpers/axios";
import { authConstants } from "./constants";

const login =(user)=>{
    return async (dispatch)=>{

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

// const signup =(user)=>{
//     return async (dispatch)=>{

//         dispatch({type:authConstants.LOGIN_REQUEST});
//         const res = await axiosInstance.post(`/admin/signup`,{
//             ...user
//         });

//         if(res.status===201){
//             const{message} = res.data;
//             dispatch({
//                 type: authConstants.LOGIN_SUCCESS,
//                 payload: {
//                     token,
//                     user
//                 }
//             });
//         }
//         else{
//             if(res.status===400){
//                 dispatch({
//                     type: authConstants.LOGIN_FAILURE,
//                     payload: {error:res.data.error}
//                 })
//             }
//         }
//     }
// }


const isUserLoggedIn =()=>{
    return async (dispatch)=>{
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

const signOut =()=>{
    return async (dispatch)=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({
            type: authConstants.LOGOUT_REQUEST
        })
    }
}


export {
    login,
    // signup,
    isUserLoggedIn,
    signOut
};