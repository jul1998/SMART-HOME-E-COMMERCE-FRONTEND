import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import "../../styles/products.css";
import { Context } from "../store/appContext";

function ProductItem({product}) {

  const { store, actions } = useContext(Context);
  let isToken = actions.showToken() 

  //Esto le da formato a cualquier interger para aparecer como moneda
  const priceDisplay = product.precio.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  let userId = localStorage.getItem("user_id")
  const addToFav = async ()=> {
    console.log(userId, product.id)
    let response = await actions.genericFetchProtected(`user/${userId}/add_to_favorite/product/${product.id}`,"POST")
    let jsonRes = await response.json()
    console.log(jsonRes)

  }

  const showFavButton = isToken?
  <button onClick={()=>addToFav()} type="button" className="btn btn-outline-info">Add to favorites</button>:
  <button type="button" className="btn btn-outline-info">Login to add product to favorites</button>




  return (
    <div className="product_list_container">
    
        <div className="col">
            <div className="card h-100">
              <img className="product_image" src="https://img.freepik.com/free-photo/medium-shot-man-wearing-vr-glasses_23-2149126949.jpg?w=1060&t=st=1669229881~exp=1669230481~hmac=8d0657c3f598a067a170b07757c757f2d011f31316863f13c0b677472f28fe1d" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Estado: {product.estado}</p>
                <p className="card-text">Id: {product.id}</p>
                <p className="card-text">Precio: {priceDisplay}</p>
                {showFavButton}
              </div>
            </div>
          </div>
        

      
    </div>
  );
}

export { ProductItem };
