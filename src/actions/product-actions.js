import axiosInstance from "../helpers/axios";
import { productConstants } from "./constants";


const addProduct = (form) => {
    return async (dispatch) => {
        dispatch({ 
            type: productConstants.ADD_PRODUCT_REQUEST 
        });
        const res = await axiosInstance.post(`/product/createproduct`, form);
        if (res.status === 200) {
          dispatch({ type: productConstants.ADD_PRODUCT_SUCCESS });;
        } else {
          dispatch({ type: productConstants.ADD_PRODUCT_FAILURE });
        }
      
    };
  };

export default addProduct;