import React, { useState, useContext } from "react";
import "../../styles/login.css";
import Swal from "sweetalert2";
import { Context } from "../store/appContext";
import {ProductItem} from "../component/ProductItem.jsx"

function Products(){
    return(
        <div>
            <ProductItem/>
        </div>
    )

}

export {Products}