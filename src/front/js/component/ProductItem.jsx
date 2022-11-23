import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import "../../styles/login.css";
import { Context } from "../store/appContext";
function ProductItem(){

    const {store, actions} = useContext(Context)

    useEffect(()=>{
        async function fetch(){
            let BACKEND_URL = process.env.BACKEND_URL
			let response = await fetch(BACKEND_URL+"products_list")
            console.log(response)
        }

        fetch()
    },[])

    return(
        <h1>Hello Product</h1>
    )
}

export {ProductItem}