import React, { useState } from 'react';
import ShoppingCart from "../../pages/ProductPage/ShoppingCartPage.jsx";

const ShoppingCartIcon = ({product, price}) => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const addItem = (product) => {
    setItems(prevItem =>[...prevItem,product]);
    setTotal(total + price);
  }

  const removeItem = (id) => {
    setItems((prevCartItems) =>
    prevCartItems.filter((element) => element.id !== id)
        );
      };

  function cartIcon (){
      const isInCart = items.some(ele => ele.id ===product.id)
      if (isInCart){
        return  <button onClick={() => removeItem(product.id)} className="button--product"><i  className="fas fa-times"></i></button>
      }else{
        return <button onClick={() => addItem(product)} className="button--product"><i  className="fas fa-shopping-cart"></i></button>
      }
    }


    


  return (
    <div>

        {cartIcon()}

    </div>
  );
};

export default ShoppingCartIcon;
