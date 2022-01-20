import { categoryConstants, productConstants } from "./constants";

import axiosInstance from "../helpers/axios";



const getInitialData = () => {
    return async dispatch => {
        const res = await axiosInstance.post(`/admin/initialData`);
        if(res.status===200){
            const {categories,products}=res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: {
                    categories
                }
            });
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: {
                    products
                }
            })
        }
        console.log(res);
    }
}

export default getInitialData;