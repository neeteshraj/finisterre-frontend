import React from 'react';
import { BrowserRouter, Routes,Route, Navigate,useNavigate, Outlet } from 'react-router-dom';
import authReducer from '../../../reducers/auth-reducers';

// const PrivateRoute = ({component: Component,...rest}) => {
//     // return <Navigate {...props}/>
//     return (
//         <Outlet {...rest} component={(props)=>{
//             const token = window.localStorage.getItem('token');
//             if(token){
//                 return <Component {...props}/>
//             }
//             else{
//                 return <Navigate to="/signin"/>
//             }
//         }}/>
//     )
// }


const PrivateRoute = (props:any) => {
    const token = window.localStorage.getItem('token');
    console.log(token);
    if(token){
        return <Route {...props}/>
    }
    else{
        return <Navigate to="/signin"/>
    }
}


export default PrivateRoute;
