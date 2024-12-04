import React from "react";
//import pnf from '../images/pnf.jpg'

function NotFound() {
    return <div className="center" id="notFound">
        {/* <img src={pnf} alt='stock chart' className='page-not-found-img'/> */}
        <h2 className='page-not-found-msg'>404 Error</h2>
        <p className="text-center">This page doesn't exist.</p>
        <p className="text-center">Would you like to return <a href="/">Home</a>?</p>
    </div>
}

export default NotFound;
