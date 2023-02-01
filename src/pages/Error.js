import React from "react";

import error from "../assets/images/error1.gif"
import { Link } from "react-router-dom";

const Error=()=>{
    return(
        <div style={{
            width:"100%",
            height:"100vh",
            display: 'flex',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:"column"
        }}>
            <img src={error} />
            <Link to={"/"}>Anasayfaya Dön</Link>
        </div>
    )
}

export default Error