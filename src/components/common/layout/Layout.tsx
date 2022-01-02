import React from 'react'
import Header from '../header/Index';
const Layout=(props:any)=> {
    return (
        <div className="layout">
            <Header/>
            {props.children}
        </div>
    )
}

export default Layout;
