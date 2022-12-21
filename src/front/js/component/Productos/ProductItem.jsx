import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import "../../../styles/products.css";
import { Context } from "../../store/appContext";

function ProductItem({ product }) {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    console.log(product);
  }, []);
  let isToken = actions.showToken();

  //Esto le da formato a cualquier interger para aparecer como moneda
  const priceDisplay = product.price.toLocaleString("en-US", {
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
    <button
      onClick={() => addToFav()}
      type="button"
      className="btn btn-outline-info"
    >
      Add to favorites
    </button>
  ) : (
    <button type="button" className="btn btn-outline-info">
      Login to add product to favorites
    </button>
  );


  return (
    <div className="product_list_container">
      <div className="col">
        <div className="card h-100">
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
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">State: {product.estado}</p>
            <p className="card-text">Id: {product.id}</p>
            <p className="card-text">Price: {product.price}</p>
            {showFavButton}
            
          </div>
        </div>
      </div>
    </div>

    
  );
}

export { ProductItem };
