import React, { useState, useContext } from "react";
import ShoppingCart from "./ShoppingCartComp.jsx";
import { Context } from "../../store/appContext";
import Swal from "sweetalert2";

const ShoppingCartIcon = ({ product, price }) => {

  const { store, actions } = useContext(Context);
  const [items, setItems] = useState([]);
  const [isInCart, setIsInCart] = useState(false);


  let userId = localStorage.getItem("user_id")

  const addItem = async () => {
    let bodyObj = {
      "product_id": product.id,
      "quantity": 1
    }
    let response = await actions.actionsShoppingCartRequest(`user/${userId}/add_shopping_cart`, "POST", bodyObj)
    let jsonRes = await response.json()
    setIsInCart(true)
    if (response.ok){
      Swal.fire({
        icon: 'success',
        title: 'Great!',
        text: `${jsonRes.message}`,
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `${jsonRes.message}`,
      })
    }

  }; 

  const removeItem = async() => {

    let bodyObj = {
      "product_id": product.id
    }
    let response = await actions.actionsShoppingCartRequest(`delete/user/${userId}/shopping_cart`, "DELETE", bodyObj)
    setIsInCart(false)
    let jsonRes = await response.json()
    if (!response.ok){
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `${jsonRes.message}`,
      })
    }else{
      Swal.fire({
        icon: 'success',
        title: 'Awesome!',
        text: `${jsonRes.message}`,
      })
    }
  };

  function cartIcon() {
    if (isInCart) {
      return (
        <button
          onClick={() => removeItem()}
          className="button--product"
        >
          <i className="fas fa-times"></i>
        </button>
      );
    } else {
      return (
        <button onClick={() => addItem()} className="button--product">
          <i className="fas fa-shopping-cart"></i>
        </button>
      );
    }
  }

  return <div>{cartIcon()}</div>;
};

export default ShoppingCartIcon;
