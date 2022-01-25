/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-undef */
import {categoryConstants} from '../actions/constants';

const initState = {
    categories: [],
    loading: false,
    error: null
};
const buildNewCategories = (parentId, categories, category, categoryImages) => {
    let myCategories =[];

    if(parentId === undefined){
        return [
            ...categories,
            {
                _id:category._id,
                name:category.name,
                slug:category.slug,
                image:category.categoryImages,
                children:[]
            }
        ]
    }

    for(let cat of categories){

        if(cat._id===parentId){
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, [...cat.children,{
                    _id:category._id,
                    name:category.name,
                    slug:category.slug,
                    image:category.categoryImages,
                    parentId:category.parentId,
                    children:category.children
                }], category) : []
            });
        }
        else{
            myCategories.push({
            ...cat,
            children: cat.children ? buildNewCategories(parentId, cat.children, category, categoryImages) : []
        });
        }
    }
    return myCategories;
}

export default (state = initState, action) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state={
                ...state,
                categories: action.payload.categories
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state={
                ...state,
                loading: true
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            const category = action.payload.category;
            const updatedCategories = buildNewCategories(category.parentId, state.categories, category, category.categoryImages);  
            state={
                ...state,
                categories: updatedCategories,
                loading: false
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state={
                ...initState
            }
    }
    return state;
}