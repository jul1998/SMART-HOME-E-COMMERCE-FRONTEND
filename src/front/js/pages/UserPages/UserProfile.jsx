import React, { useState, useContext } from "react";
import "../../../styles/login.css";
import Swal from "sweetalert2";
import { Context } from "../../store/appContext";
import { Link, useParams } from "react-router-dom";

function UserProfile(){
    const { store, actions } = useContext(Context);
	const params = useParams();
    
    console.log(params)

    return(
        <h1>User profile</h1>
    )
}

export {UserProfile}