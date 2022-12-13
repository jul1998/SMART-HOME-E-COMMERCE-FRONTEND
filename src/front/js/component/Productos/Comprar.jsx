import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import "../../../styles/comprar.css";
import { Context } from "../../store/appContext";

function Total() {

    const { store, actions } = useContext(Context);

    let userId = localStorage.getItem("user_id")
    const total = async () => {
        console.log(userId)
        let response = await actions.carritoCompras(`user/${userId}/carritoCompras`)
        let jsonRes = response
        let suma = 0
        jsonRes.forEach(item => {
            suma = suma + (item.cantidad * item.costoUnitario)
        })
        suma = suma.toString()
        console.log(suma)
        let access = await actions.getAccessToken()
        let linc = await actions.createAnOrder(suma)
        console.log(linc)
        
    }


    return (
        <button onClick={() => total()} type="button" className="btn btn-outline-info">total</button>
    );
}

export { Total };