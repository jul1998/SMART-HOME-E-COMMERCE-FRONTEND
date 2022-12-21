import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import "../../../styles/products.css";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

function ProductItem({ product }) {
  const { store, actions } = useContext(Context);
  let isToken = actions.showToken();
  const navigate = useNavigate();

  let floatProduct = parseFloat(product.price); //Converts price into number

  //Esto le da formato a cualquier interger para aparecer como moneda
  const priceDisplay = floatProduct.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  let userId = localStorage.getItem("user_id");
  const addToFav = async () => {
    console.log(userId, product.id);
    let response = await actions.genericFetchProtected(
      `user/${userId}/add_to_favorite/product/${product.id}`,
      "POST"
    );
    let jsonRes = await response.json();
    console.log(jsonRes);
  };

  const showFavButton = isToken ? (
    <button onClick={() => addToFav()} type="button" className="button">
      <i class="far fa-heart"></i>
    </button>
  ) : (
    <button
      onClick={() => navigate("/login")}
      type="button"
      className="btn btn-outline-info"
    >
      Login to add product to favorites
    </button>
  );

  return (
    <div className="col-12 col-md-4 my-2">
      <div className="card">
        <img
          className="product_image"
          src={
            product.img
              ? product.img
              : "https://images.unsplash.com/photo-1633078654544-61b3455b9161?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8NDA0JTIwZXJyb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
          }
          alt="..."
        />
        <div className="card-body">
          <Link to={`/product/${product.id}/detail_page`}>
            <h5 className="card-title">{product.name}</h5>
          </Link>
          <p className="card-text">Estado: {product.estado}</p>
          <p className="card-text">Disponibles: {product.stock}</p>
          <p className="card-text">Precio: {priceDisplay}</p>
          {showFavButton}
          <Link to={`/product/${product.id}/detail_page`}>
            <button className="button"><i className="fas fa-shopping-cart"></i></button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export { ProductItem };
