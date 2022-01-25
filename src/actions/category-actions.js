import axiosInstance from "../helpers/axios";
import { categoryConstants } from "./constants";


export const getAllCategories = () => {
    return async (dispatch)=>{
        dispatch({type:categoryConstants.GET_ALL_CATEGORIES_REQUEST});
        const res = await axiosInstance.get(`/category/getcategory`);
        console.log(res);
        if(res.status===200){

            const {categories} = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload:{categories:categories}
            })
        }
        else{
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload:{error:res.data.error}
            })
        }
    }
}



export const addCategory = (form) => {
    return async (dispatch)=>{
        dispatch({
            type: categoryConstants.ADD_NEW_CATEGORY_REQUEST
        });
        const res = await axiosInstance.post(`/category/createcategory`,form,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        });
        if(res.status===200){
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                payload:{category:res.data.category}
            })
        }
        else{
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                payload:res.data.error
            })
        }
    }
} 

