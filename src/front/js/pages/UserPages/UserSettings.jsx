import React, { useState, useContext, useEffect} from "react";
import "../../../styles/loginProfile.css";
import Swal from "sweetalert2";
import { Context } from "../../store/appContext";
import { Link, useParams } from "react-router-dom";

function UserSettings(){
    const params = useParams();
    console.log(params)
    
    return(
        <h1>Settings</h1>
    )
}

export {UserSettings}