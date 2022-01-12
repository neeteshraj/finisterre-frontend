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
    return async dispatch=>{
        const res = await axiosInstance.post(`/category/createcategory`,form);
        console.log(res);
    }
} 


// export {
//     getAllCategories,
//     addCategory
// };