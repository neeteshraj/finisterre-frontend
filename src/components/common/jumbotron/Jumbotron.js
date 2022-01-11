import React from 'react'
import './Jumbotron.css'

const Jumbotron=() =>{
    return (
        <div className="jumbotron jumbotron-fluid">
            <div className="container text-center text-light">
                <h1 className="display-4">Welcome to Admin Dashboard</h1>
                <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
            </div>
        </div>
    )
}

export default Jumbotron;
