const axiosInstance = require("../helpers/axios");

const addProduct = form => {
    return async (dispatch)=>{
        const res = await axiosInstance.post(`/product/createproduct`,form);
        if(res.status===200){
            console.log(res);
        }

    }
}

export default addProduct;