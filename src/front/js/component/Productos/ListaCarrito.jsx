import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import "../../../styles/products.css";
import { Context } from "../../store/appContext";
import { userActions } from "../../store/User/user";

function ListaCarrito() {

  const { store, actions } = useContext(Context);
  
  let userId = localStorage.getItem("user_id")
  const paypalCreateOrder = async () => {
    console.log(userId)
    let response = await userActions.carritoCompras(`user/${userId}/carritoCompras`)
    let jsonRes = await response.json()
    console.log(jsonRes)

  }

  const showBuyButton = jsonRes.lenght > 0 ?
    <button onClick={() => paypalCreateOrder()} type="button" className="btn btn-outline-info">Comprar</button> :
    <button type="button" disabled={true} className="btn btn-outline-info">Comprar</button>

  return (
    <div className="product_list_container">

      <div className="col">
        <div className="card h-100">
        {paypalCreateOrder}
          <div className="card-body">

          </div>
        </div>
      </div>



    </div>
  );
}

export { ListaCarrito };
