import React from 'react';
import { 
    Navigate, 
    Outlet, 
    useLocation 
} from 'react-router-dom';


const PrivateRoute:React.FC<any> = ({component: Component,...props}) => {
    const location = useLocation();
    const token = window.localStorage.getItem('token');
    return token ? (
        <Outlet {...props} component={(props:any)=>{
            console.log('props: ', props);
            return <Component {...props}/>
        }}/>
    ) : (
        <Navigate to={`/signin`}/>
    )
}   


export default PrivateRoute;


